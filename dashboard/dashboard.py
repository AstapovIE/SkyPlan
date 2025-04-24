import dash
from dash import dcc, html
from dash.dependencies import Input, Output
import pandas as pd
import plotly.express as px
import os

# 1) Загрузка данных
csv_path = os.path.join(os.path.dirname(__file__), "df.csv")
df = pd.read_csv(csv_path, parse_dates=["time"])

# 2) Инициализация Dash
app = dash.Dash(__name__, suppress_callback_exceptions=True,requests_pathname_prefix='/dashboard/')

# 3) Макет
app.layout = html.Div([
    html.H1("Weather Dashboard"),
    # выпадающий список для слоя
    dcc.Dropdown(
        id="layer-dropdown",
        options=[
            {"label": "Осадки (prcp)", "value": "prcp"},
            {"label": "Темп. средняя (tavg)", "value": "tavg"},
            {"label": "Скорость ветра (wspd)", "value": "wspd"},
        ],
        value="prcp"
    ),
    # слайдер по дате
    dcc.Slider(
        id="date-slider",
        min=0,
        max=len(df["time"].unique()) - 1,
        value=0,
        marks={
            i: date.strftime("%Y-%m-%d")
            for i, date in enumerate(sorted(df["time"].unique()))
        },
        step=None
    ),
    # контейнер для карты
    dcc.Graph(id="map")
])

# 4) Callback для обновления карты
@app.callback(
    Output("map", "figure"),
    [
        Input("date-slider", "value"),
        Input("layer-dropdown", "value"),
    ]
)
def update_map(date_idx, layer):
    dates = sorted(df["time"].unique())
    selected_date = dates[date_idx]
    dff = df[df["time"] == selected_date]

    fig = px.scatter_mapbox(
        dff,
        lat="lat", lon="lng",
        color=layer,
        size=layer,             # можно подобрать размер
        hover_name="city",
        hover_data=[layer],
        mapbox_style="open-street-map",
        zoom=2,
        title=f"{layer} on {selected_date.strftime('%Y-%m-%d')}"
    )
    return fig

# 5) Запуск
if __name__ == "__main__":
    app.run(debug=True)
