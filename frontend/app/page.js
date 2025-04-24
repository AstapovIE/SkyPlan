import Image from "next/image";
import { AnimationOne } from "./_components/AnimationOne";
import Second from "./_components/Second"
import { SmoothScroll } from "./_components/SmoothScroll";
import HorizontalScroll from "./_components/HorizontalScroll";
import Last from "./_components/Last";
import Modul from "./_components/Modul";

export default function Home() {
  return (
    <SmoothScroll>
    <AnimationOne/>
    <HorizontalScroll/>
    <Second/>
    <Last/>
    <Modul/>
    </SmoothScroll>
  );
}