import dash
from dash import dcc, html
from dash.dependencies import Input, Output
import pandas as pd
import plotly.express as px
import os
from datetime import datetime

# 1) Загрузка данных
data_csv = os.path.join(os.path.dirname(__file__), "df.csv")
df = pd.read_csv(data_csv, parse_dates=["time"])

# Разделяем исторические и прогнозные данные
today = pd.Timestamp(datetime.now().date())
hist_df = df[df["time"] <= today]
forecast_df = df[df["time"] > today]

# 2) Инициализация Dash
app = dash.Dash(__name__, suppress_callback_exceptions=True)

# Подготовка уникальных исторических дат
dates = sorted(hist_df["time"].unique())
# Отбор меток — только начало кварталов
marks = {
    i: {'label': date.strftime('%d.%m.%Y'), 'style': {'transform': 'rotate(90deg)', 'whiteSpace': 'nowrap', 'fontSize': '10px'}}
    for i, date in enumerate(dates)
    if date.month in (1, 4, 7, 10) and date.day == 1
}

# Русские подписи для слоёв и единиц
layer_names = {
    'tavg': 'Температура, °C',
    'prcp': 'Осадки, мм',
    'wspd': 'Ветер, м/с'
}
# Цвета топ-5
top_colors = ['#FFD700', '#C0C0C0', '#CD7F32', '#66CCFF', '#99FF99']

# 3) Макет
def serve_layout():
    return html.Div([
        html.H1("Погодный дашборд", style={'textAlign': 'center', 'marginBottom': '20px', 'color': '#333'}),
        html.Div([
            html.Div([dcc.Graph(id="map", style={"width": "100%", "height": "80vh"})],
                     style={"width": "65%", "display": "inline-block", "padding": "10px"}),
            html.Div([
                html.H2("Топ регионов", style={'textAlign': 'center'}),
                html.Div(id="top-regions", style={"marginBottom": "30px"}),
                html.Label("Параметр:"),
                dcc.Dropdown(
                    id="layer-dropdown",
                    options=[{"label": layer_names[k], "value": k} for k in layer_names],
                    value="tavg"
                ),
                html.Br(),
                html.Label("Дата:"),
                html.Div(dcc.Slider(
                    id="date-slider", min=0, max=len(dates) - 1, value=0,
                    marks=marks, step=None
                ), style={'paddingTop': '40px'})
            ], style={"width": "30%", "display": "inline-block", "verticalAlign": "top", "padding": "10px"})
        ]),
        html.Div([
            html.H2(id="detail-header", style={'textAlign': 'center', 'marginTop': '0'}),
            html.Div([
                html.Div(dcc.Graph(id="temp-chart"),
                         style={'width': '32%', 'padding': '5px', 'borderRadius': '10px', 'background': '#fff'}),
                html.Div(dcc.Graph(id="prcp-chart"),
                         style={'width': '32%', 'padding': '5px', 'borderRadius': '10px', 'background': '#fff'}),
                html.Div(dcc.Graph(id="wspd-chart"),
                         style={'width': '32%', 'padding': '5px', 'borderRadius': '10px', 'background': '#fff'})
            ], style={"display": "flex", "justifyContent": "space-between", "paddingTop": "10px"})
        ])
    ], style={"margin": 0, "padding": "20px", 'background': 'linear-gradient(to bottom right, #fafafa, #e8e4e4)'})

app.layout = serve_layout

# 4) Сброс даты при смене параметра
@app.callback(Output("date-slider", "value"), Input("layer-dropdown", "value"))
def reset_date(_):
    return 0

# 5) Обновление карты, топа и детальных графиков в одном колбэке
@app.callback(
    [Output("map", "figure"), Output("top-regions", "children"),
     Output("detail-header", "children"),
     Output("temp-chart", "figure"), Output("prcp-chart", "figure"), Output("wspd-chart", "figure")],
    [Input("date-slider", "value"), Input("layer-dropdown", "value"), Input("map", "clickData")]
)
def update_all(date_idx, layer, click_data):
    # Общая логика для карты и топ-листа
    sel_date = dates[date_idx]
    dff = hist_df[hist_df["time"] == sel_date].copy()
    # Корректировка размера маркеров: делаем значения неотрицательными
    min_val = dff[layer].min()
    dff['marker_size'] = (dff[layer] - min_val) + 1

    fig_map = px.scatter_mapbox(
        dff,
        lat="lat",
        lon="lng",
        color=layer,
        size='marker_size',
        hover_name="city",
        hover_data={layer: ':.2f'},
        mapbox_style="open-street-map",
        zoom=2,
        title=f"{layer_names[layer]} на {sel_date.strftime('%d.%m.%Y')}"
    )
    top5 = dff.nlargest(5, layer)
    for idx, row in enumerate(top5.itertuples()):
        fig_map.add_scattermapbox(
            lat=[row.lat], lon=[row.lng], mode='markers',
            marker={'size': 20, 'color': top_colors[idx], 'symbol': 'square'},
            showlegend=False
        )

    # Список топ-5
    items = [
        html.Div(
            f"{r.city}: {getattr(r, layer):.2f} {layer_names[layer].split(', ')[1]}",
            style={
                'backgroundColor': top_colors[i],
                'padding': '8px',
                'borderRadius': '10px',
                'marginBottom': '5px'
            }
        )
        for i, r in enumerate(top5.itertuples())
    ]

    # Определяем регион для детализации
    if click_data and click_data.get('points'):
        city = click_data['points'][0]['hovertext']
    else:
        city = top5.iloc[0].city
    header = f"Детальные графики по выбранному региону — {city}"

    # Подготовка данных для детальных графиков
    hist_c = hist_df[hist_df['city'] == city]
    fc = forecast_df[forecast_df['city'] == city]
    comb = pd.concat([
        hist_c.assign(Тип='Исторические'),
        fc.assign(Тип='Прогноз')
    ])
    max_t = comb['time'].max()
    min_t = max_t - pd.Timedelta(days=438)

    # Температура
    fig_t = px.line(
        comb,
        x='time',
        y=['tmin', 'tavg', 'tmax'],
        labels={'variable': 'Показатель', 'value': '°C', 'time': 'Дата'},
        title=f"Температура в {city}",
        color_discrete_sequence=['red', 'orange', 'green']
    )
    name_map = {'tmin': 'Минимальная', 'tavg': 'Средняя', 'tmax': 'Максимальная'}
    for trace in fig_t.data:
        trace.name = name_map.get(trace.name, trace.name)
    fig_t.update_layout(legend_title_text='Температура')
    fig_t.add_vrect(
        x0=today,
        x1=max_t,
        fillcolor='lightgrey',
        opacity=0.3,
        annotation_text='Прогноз',
        annotation_position='top left'
    )
    fig_t.update_xaxes(range=[min_t, max_t], tickformat='%d.%m.%Y', tickangle=45)

    # Осадки
    fig_p = px.line(
        comb,
        x='time',
        y='prcp',
        labels={'prcp': 'Осадки, мм', 'time': 'Дата'},
        title=f"Осадки в {city}",
        color_discrete_sequence=['blue']
    )
    fig_p.update_layout(showlegend=False)
    fig_p.add_vrect(x0=today, x1=max_t, fillcolor='lightgrey', opacity=0.3)
    fig_p.update_xaxes(range=[min_t, max_t], tickformat='%d.%m.%Y', tickangle=45)

    # Ветер
    fig_w = px.line(
        comb,
        x='time',
        y='wspd',
        labels={'wspd': 'Скорость ветра, м/с', 'time': 'Дата'},
        title=f"Ветер в {city}",
        color_discrete_sequence=['purple']
    )
    fig_w.update_layout(showlegend=False)
    fig_w.add_vrect(x0=today, x1=max_t, fillcolor='lightgrey', opacity=0.3)
    fig_w.update_xaxes(range=[min_t, max_t], tickformat='%d.%m.%Y', tickangle=45)

    return fig_map, html.Div(items), header, fig_t, fig_p, fig_w

# 6) Запуск
if __name__ == "__main__":
    app.run(debug=True)
