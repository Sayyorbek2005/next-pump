import React, { useState } from "react";
import { FiArrowLeft, FiPackage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import "./katalog.css";

// === PUMPMAN RASMLARI IMPORTI (O'zingizning assets2 papkangizdan) ===
import imgQB from "./assets2/QB.png";
import imgCPm from "./assets2/CPm.png";
import imgPW from "./assets2/PW.png";
import imgPWE from "./assets2/PW-E.png";
import imgPWF from "./assets2/PW.png";
import imgQDX from "./assets2/QDX.png";
import imgTCM from "./assets2/TCM.png";
import imgTCH from "./assets2/TCM.png";
import imgJET from "./assets2/JET.png";
import imgTHF from "./assets2/THF.png";
import img2TCP from "./assets2/2TCP25-160A.png";
import img50WFD from "./assets2/WFD.png"; 
import imgQFD from "./assets2/QFD.png";
import imgATJSW from "./assets2/ATJSW.png";
import imgSTAR_F from "./assets2/STSR40-10F.png"; 
import imgSGJ from "./assets2/2STM-2.png";
import imgGS from "./assets2/2STM-2.png";
import imgCHLFT from "./assets2/CHLF(T)гиpng.png";
import imgCHM from "./assets2/CHMгиpng.png";
import imgTW from "./assets2/TW-T.png";
import imgGRD from "./assets2/GP.png";
import imgSTAR_C from "./assets2/STAR-6A.png"; 
import imgPM01 from "./assets2/PW.png";

// === 1. JADVALDAGI BARCHA NASOS TURLARI (KATEGORIYALARI) ===
const NASOS_TYPES = [
  { id: "qb", name_uz: "QB — Вихревой" },
  { id: "cpm", name_uz: "CPm — Центробежный" },
  { id: "pw", name_uz: "PW — Периферийный" },
  { id: "pwe", name_uz: "PWE — Периферийный с сухой защитой" },
  { id: "pwf", name_uz: "PWF — Периферийный с сухой защитой (Адаптивный)" },
  { id: "qdx", name_uz: "QDX — Погружной" },
  { id: "tcm5", name_uz: "TCM5 — Поверхностный" },
  { id: "tch", name_uz: "TCH(m) — Поверхностный" },
  { id: "jet", name_uz: "JET — Самовсасывающий" },
  { id: "thf", name_uz: "THF — Центробежный / Высокопроизводительный" },
  { id: "tcp25", name_uz: "2TCP25 — Центробежный" },
  { id: "wfd11", name_uz: "50WFD11 — Канализационный" },
  { id: "qfd", name_uz: "QFD — Погружной" },
  { id: "atjsw", name_uz: "ATJSW — Насосная станция" },
  { id: "star_f", name_uz: "STAR — Циркуляционный частотный с фланцем" },
  { id: "sgj", name_uz: "SGJ — Самовсасывающий" },
  { id: "gs", name_uz: "GS — Дренажный" },
  { id: "chlft", name_uz: "CHLFT(T) — Центробежный для горячей воды" },
  { id: "chm", name_uz: "CHM — Центробежный для горячей воды" },
  { id: "tw", name_uz: "TW — Периферийный" },
  { id: "grd", name_uz: "GRD — Рециркуляция Латунь" },
  { id: "star_c", name_uz: "STAR — Циркуляционный частотный" },
  { id: "pm01", name_uz: "PM-01 — Пресс-контроль" }
];

// === 2. JADVALDAGI BARCHA MODELLAR VA ULARNING TEXNIK PARAMETRLARI ===
const MOCK_PRODUCTS = [
  // === QB — Вихревой ===
  {
    id: 101, type_id: "qb", title_uz: "Pumpman QB60 ECO", price: 280000, image_url: imgQB,
    specs: [
      { key: "Turi", value: "Вихревой" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.37" }, { key: "Suv sarfi (л/м)", value: "35" },
      { key: "Balandligi (Подъём, m)", value: "32" }
    ]
  },
  {
    id: 102, type_id: "qb", title_uz: "Pumpman QB60", price: 320000, image_url: imgQB,
    specs: [
      { key: "Turi", value: "Вихревой" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.37" }, { key: "Suv sarfi (л/м)", value: "35" },
      { key: "Balandligi (Подъём, m)", value: "35" }
    ]
  },
  {
    id: 103, type_id: "qb", title_uz: "Pumpman QB70", price: 520000, image_url: imgQB,
    specs: [
      { key: "Turi", value: "Вихревой" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.55" }, { key: "Suv sarfi (л/м)", value: "45" },
      { key: "Balandligi (Подъём, m)", value: "45" }
    ]
  },
  {
    id: 104, type_id: "qb", title_uz: "Pumpman QB80", price: 570000, image_url: imgQB,
    specs: [
      { key: "Turi", value: "Вихревой" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.75" }, { key: "Suv sarfi (л/м)", value: "45" },
      { key: "Balandligi (Подъём, m)", value: "53" }
    ]
  },

  // === CPm — Центробежный ===
  {
    id: 201, type_id: "cpm", title_uz: "Pumpman CPm130", price: 510000, image_url: imgCPm,
    specs: [
      { key: "Turi", value: "Центробежный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.37" }, { key: "Suv sarfi (л/м)", value: "105" },
      { key: "Balandligi (Подъём, m)", value: "22" }
    ]
  },
  {
    id: 202, type_id: "cpm", title_uz: "Pumpman CPm146", price: 620000, image_url: imgCPm,
    specs: [
      { key: "Turi", value: "Центробежный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.55" }, { key: "Suv sarfi (л/м)", value: "125" },
      { key: "Balandligi (Подъём, m)", value: "27" }
    ]
  },
  {
    id: 203, type_id: "cpm", title_uz: "Pumpman CPm158", price: 690000, image_url: imgCPm,
    specs: [
      { key: "Turi", value: "Центробежный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.75" }, { key: "Suv sarfi (л/м)", value: "125" },
      { key: "Balandligi (Подъём, m)", value: "32" }
    ]
  },
  {
    id: 204, type_id: "cpm", title_uz: "Pumpman CPm170", price: 1120000, image_url: imgCPm,
    specs: [
      { key: "Turi", value: "Центробежный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "1.1" }, { key: "Suv sarfi (л/м)", value: "133" },
      { key: "Balandligi (Подъём, m)", value: "41" }
    ]
  },
  {
    id: 205, type_id: "cpm", title_uz: "Pumpman CPm200", price: 1250000, image_url: imgCPm,
    specs: [
      { key: "Turi", value: "Центробежный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "1.5" }, { key: "Suv sarfi (л/м)", value: "133" },
      { key: "Balandligi (Подъём, m)", value: "43" }
    ]
  },

  // === PW — Периферийный ===
  {
    id: 301, type_id: "pw", title_uz: "Pumpman PW125", price: 550000, image_url: imgPW,
    specs: [
      { key: "Turi", value: "Периферийный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.125" }, { key: "Suv sarfi (л/м)", value: "33" },
      { key: "Balandligi (Подъём, m)", value: "24" }
    ]
  },
  {
    id: 302, type_id: "pw", title_uz: "Pumpman PW250", price: 570000, image_url: imgPW,
    specs: [
      { key: "Turi", value: "Периферийный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.25" }, { key: "Suv sarfi (л/м)", value: "36" },
      { key: "Balandligi (Подъём, m)", value: "30" }
    ]
  },
  {
    id: 303, type_id: "pw", title_uz: "Pumpman PW370", price: 580000, image_url: imgPW,
    specs: [
      { key: "Turi", value: "Периферийный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.37" }, { key: "Suv sarfi (л/м)", value: "40" },
      { key: "Balandligi (Подъём, m)", value: "36" }
    ]
  },
  {
    id: 304, type_id: "pw", title_uz: "Pumpman PW550", price: 700000, image_url: imgPW,
    specs: [
      { key: "Turi", value: "Периферийный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.55" }, { key: "Suv sarfi (л/м)", value: "50" },
      { key: "Balandligi (Подъём, m)", value: "42" }
    ]
  },
  {
    id: 305, type_id: "pw", title_uz: "Pumpman PW750", price: 780000, image_url: imgPW,
    specs: [
      { key: "Turi", value: "Периферийный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.75" }, { key: "Suv sarfi (л/м)", value: "56" },
      { key: "Balandligi (Подъём, m)", value: "50" }
    ]
  },
  {
    id: 306, type_id: "pw", title_uz: "Pumpman PW1100", price: 1070000, image_url: imgPW,
    specs: [
      { key: "Turi", value: "Периферийный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "40*40" },
      { key: "Quvvati (кВт)", value: "1.1" }, { key: "Suv sarfi (л/м)", value: "100" },
      { key: "Balandligi (Подъём, m)", value: "55" }
    ]
  },

  // === PWE — Периферийный с сухой защитой ===
  {
    id: 401, type_id: "pwe", title_uz: "Pumpman PWE 125", price: 620000, image_url: imgPWE,
    specs: [
      { key: "Turi", value: "Периферийный с сухой защитой" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.125" }, { key: "Suv sarfi (л/м)", value: "33" },
      { key: "Balandligi (Подъём, m)", value: "24" }
    ]
  },
  {
    id: 402, type_id: "pwe", title_uz: "Pumpman PWE 250", price: 670000, image_url: imgPWE,
    specs: [
      { key: "Turi", value: "Периферийный с сухой защитой" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.25" }, { key: "Suv sarfi (л/м)", value: "36" },
      { key: "Balandligi (Подъём, m)", value: "30" }
    ]
  },
  {
    id: 403, type_id: "pwe", title_uz: "Pumpman PWE 370", price: 690000, image_url: imgPWE,
    specs: [
      { key: "Turi", value: "Периферийный с сухой защитой" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.37" }, { key: "Suv sarfi (л/м)", value: "40" },
      { key: "Balandligi (Подъём, m)", value: "36" }
    ]
  },
  {
    id: 404, type_id: "pwe", title_uz: "Pumpman PWE 550", price: 840000, image_url: imgPWE,
    specs: [
      { key: "Turi", value: "Периферийный с сухой защитой" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.55" }, { key: "Suv sarfi (л/м)", value: "50" },
      { key: "Balandligi (Подъём, m)", value: "42" }
    ]
  },
  {
    id: 405, type_id: "pwe", title_uz: "Pumpman PWE 750", price: 920000, image_url: imgPWE,
    specs: [
      { key: "Turi", value: "Периферийный с сухой защитой" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.75" }, { key: "Suv sarfi (л/м)", value: "56" },
      { key: "Balandligi (Подъём, m)", value: "50" }
    ]
  },

  // === PWF — Периферийный адаптивный ===
  {
    id: 501, type_id: "pwf", title_uz: "Pumpman PWF 125", price: 670000, image_url: imgPWF,
    specs: [
      { key: "Turi", value: "Периферийный адаптивный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.125" }, { key: "Suv sarfi (л/м)", value: "33" },
      { key: "Balandligi (Подъём, m)", value: "24" }
    ]
  },
  {
    id: 502, type_id: "pwf", title_uz: "Pumpman PWF 250", price: 710000, image_url: imgPWF,
    specs: [
      { key: "Turi", value: "Периферийный адаптивный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.25" }, { key: "Suv sarfi (л/м)", value: "36" },
      { key: "Balandligi (Подъём, m)", value: "30" }
    ]
  },
  {
    id: 503, type_id: "pwf", title_uz: "Pumpman PWF 370", price: 750000, image_url: imgPWF,
    specs: [
      { key: "Turi", value: "Периферийный адаптивный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.37" }, { key: "Suv sarfi (л/м)", value: "40" },
      { key: "Balandligi (Подъём, m)", value: "36" }
    ]
  },
  {
    id: 504, type_id: "pwf", title_uz: "Pumpman PWF 550", price: 900000, image_url: imgPWF,
    specs: [
      { key: "Turi", value: "Периферийный адаптивный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.55" }, { key: "Suv sarfi (л/м)", value: "50" },
      { key: "Balandligi (Подъём, m)", value: "42" }
    ]
  },
  {
    id: 505, type_id: "pwf", title_uz: "Pumpman PWF 750", price: 1000000, image_url: imgPWF,
    specs: [
      { key: "Turi", value: "Периферийный адаптивный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.75" }, { key: "Suv sarfi (л/м)", value: "56" },
      { key: "Balandligi (Подъём, m)", value: "50" }
    ]
  },

  // === QDX — Погружной ===
  {
    id: 601, type_id: "qdx", title_uz: "Pumpman QDX1.5-12-0.25L(A)", price: 470000, image_url: imgQDX,
    specs: [
      { key: "Turi", value: "Погружной дренажный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.25" }, { key: "Suv sarfi (л/м)", value: "91" },
      { key: "Balandligi (Подъём, m)", value: "13" }
    ]
  },
  {
    id: 602, type_id: "qdx", title_uz: "Pumpman QDX1.5-17-0.37L(A)", price: 520000, image_url: imgQDX,
    specs: [
      { key: "Turi", value: "Погружной дренажный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.37" }, { key: "Suv sarfi (л/м)", value: "107" },
      { key: "Balandligi (Подъём, m)", value: "18" }
    ]
  },
  {
    id: 603, type_id: "qdx", title_uz: "Pumpman QDX1.5-24-0.55L(A)", price: 670000, image_url: imgQDX,
    specs: [
      { key: "Turi", value: "Погружной дренажный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.55" }, { key: "Suv sarfi (л/м)", value: "120" },
      { key: "Balandligi (Подъём, m)", value: "25" }
    ]
  },
  {
    id: 604, type_id: "qdx", title_uz: "Pumpman QDX3-18-0.55L(A)", price: 670000, image_url: imgQDX,
    specs: [
      { key: "Turi", value: "Погружной дренажный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.55" }, { key: "Suv sarfi (л/м)", value: "120" },
      { key: "Balandligi (Подъём, m)", value: "25" }
    ]
  },
  {
    id: 605, type_id: "qdx", title_uz: "Pumpman QDX1.5-32-0.75L(A)", price: 770000, image_url: imgQDX,
    specs: [
      { key: "Turi", value: "Погружной дренажный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.78" }, { key: "Suv sarfi (л/м)", value: "120" },
      { key: "Balandligi (Подъём, m)", value: "33" }
    ]
  },
  {
    id: 606, type_id: "qdx", title_uz: "Pumpman QDX10-12-0.55L(A)", price: 720000, image_url: imgQDX,
    specs: [
      { key: "Turi", value: "Погружной дренажный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "50*50" },
      { key: "Quvvati (кВт)", value: "0.55" }, { key: "Suv sarfi (л/м)", value: "300" },
      { key: "Balandligi (Подъём, m)", value: "16" }
    ]
  },
  {
    id: 607, type_id: "qdx", title_uz: "Pumpman QDX15-7-0.55L(A)", price: 820000, image_url: imgQDX,
    specs: [
      { key: "Turi", value: "Погружной дренажный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "50*50" },
      { key: "Quvvati (кВт)", value: "0.55" }, { key: "Suv sarfi (л/м)", value: "410" },
      { key: "Balandligi (Подъём, m)", value: "8.5" }
    ]
  },
  {
    id: 608, type_id: "qdx", title_uz: "Pumpman QDX10-16-0.75L(A)", price: 770000, image_url: imgQDX,
    specs: [
      { key: "Turi", value: "Погружной дренажный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "50*50" },
      { key: "Quvvati (кВт)", value: "0.75" }, { key: "Suv sarfi (л/м)", value: "350" },
      { key: "Balandligi (Подъём, m)", value: "19" }
    ]
  },
  {
    id: 609, type_id: "qdx", title_uz: "Pumpman QDX15-14-1.1L(A)", price: 900000, image_url: imgQDX,
    specs: [
      { key: "Turi", value: "Погружной дренажный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "63*63" },
      { key: "Quvvati (кВт)", value: "1.1" }, { key: "Suv sarfi (л/м)", value: "560" },
      { key: "Balandligi (Подъём, m)", value: "18" }
    ]
  },
  {
    id: 610, type_id: "qdx", title_uz: "Pumpman QDX15-10-0.75L(A)", price: 770000, image_url: imgQDX,
    specs: [
      { key: "Turi", value: "Погружной дренажный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "63*63" },
      { key: "Quvvati (кВт)", value: "0.75" }, { key: "Suv sarfi (л/м)", value: "580" },
      { key: "Balandligi (Подъём, m)", value: "11" }
    ]
  },
  {
    id: 611, type_id: "qdx", title_uz: "Pumpman QDX30-6-0.75L(A)", price: 830000, image_url: imgQDX,
    specs: [
      { key: "Turi", value: "Погружной дренажный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "75*75" },
      { key: "Quvvati (кВт)", value: "0.75" }, { key: "Suv sarfi (л/м)", value: "630" },
      { key: "Balandligi (Подъём, m)", value: "9" }
    ]
  },
  {
    id: 612, type_id: "qdx", title_uz: "Pumpman QDX40-6-1.1L(A)", price: 950000, image_url: imgQDX,
    specs: [
      { key: "Turi", value: "Погружной дренажный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "75*75" },
      { key: "Quvvati (кВт)", value: "1.1" }, { key: "Suv sarfi (л/м)", value: "860" },
      { key: "Balandligi (Подъём, m)", value: "12" }
    ]
  },

  // === TCM5 — Поверхностный ===
  {
    id: 701, type_id: "tcm5", title_uz: "Pumpman TCM 5.4-31/4-0.55", price: 900000, image_url: imgTCM,
    specs: [
      { key: "Turi", value: "Поверхностный многоступенчатый" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.55" }, { key: "Suv sarfi (л/м)", value: "33" },
      { key: "Balandligi (Подъём, m)", value: "31" }
    ]
  },
  {
    id: 702, type_id: "tcm5", title_uz: "Pumpman TCM 5.4-40/5-0.65", price: 1000000, image_url: imgTCM,
    specs: [
      { key: "Turi", value: "Поверхностный многоступенчатый" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.65" }, { key: "Suv sarfi (л/м)", value: "50" },
      { key: "Balandligi (Подъём, m)", value: "40" }
    ]
  },
  {
    id: 703, type_id: "tcm5", title_uz: "Pumpman TCM 5.4-46/6-0.7", price: 1050000, image_url: imgTCM,
    specs: [
      { key: "Turi", value: "Поверхностный многоступенчатый" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.7" }, { key: "Suv sarfi (л/м)", value: "67" },
      { key: "Balandligi (Подъём, m)", value: "46" }
    ]
  },
  {
    id: 704, type_id: "tcm5", title_uz: "Pumpman TCM 5.4-52/7-0.75", price: 1100000, image_url: imgTCM,
    specs: [
      { key: "Turi", value: "Поверхностный многоступенчатый" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.75" }, { key: "Suv sarfi (л/м)", value: "83" },
      { key: "Balandligi (Подъём, m)", value: "52" }
    ]
  },
  {
    id: 705, type_id: "tcm5", title_uz: "Pumpman TCM 5.4-60/8-0.8", price: 1200000, image_url: imgTCM,
    specs: [
      { key: "Turi", value: "Поверхностный многоступенчатый" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.8" }, { key: "Suv sarfi (л/м)", value: "100" },
      { key: "Balandligi (Подъём, m)", value: "64" }
    ]
  },

  // === TCH(m) — Поверхностный ===
  {
    id: 801, type_id: "tch", title_uz: "Pumpman TCH(m) 3-2BR 0.37", price: 800000, image_url: imgTCH,
    specs: [
      { key: "Turi", value: "Поверхностный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.37" }, { key: "Suv sarfi (л/м)", value: "80" },
      { key: "Balandligi (Подъём, m)", value: "20" }
    ]
  },
  {
    id: 802, type_id: "tch", title_uz: "Pumpman TCH(m) 3-3BR 0.55", price: 900000, image_url: imgTCH,
    specs: [
      { key: "Turi", value: "Поверхностный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.55" }, { key: "Suv sarfi (л/м)", value: "80" },
      { key: "Balandligi (Подъём, m)", value: "32" }
    ]
  },
  {
    id: 803, type_id: "tch", title_uz: "Pumpman TCH(m) 3-4BR 0.75", price: 1000000, image_url: imgTCH,
    specs: [
      { key: "Turi", value: "Поверхностный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.75" }, { key: "Suv sarfi (л/м)", value: "80" },
      { key: "Balandligi (Подъём, m)", value: "42" }
    ]
  },
  {
    id: 804, type_id: "tch", title_uz: "Pumpman TCH(m) 3-5BR 0.9", price: 1100000, image_url: imgTCH,
    specs: [
      { key: "Turi", value: "Поверхностный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.9" }, { key: "Suv sarfi (л/м)", value: "80" },
      { key: "Balandligi (Подъём, m)", value: "52" }
    ]
  },

  // === JET — Самовсасывающий ===
  {
    id: 901, type_id: "jet", title_uz: "Pumpman JET 80", price: 710000, image_url: imgJET,
    specs: [
      { key: "Turi", value: "Самовсасывающий JET" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.55" }, { key: "Suv sarfi (л/м)", value: "53" },
      { key: "Balandligi (Подъём, m)", value: "38" }
    ]
  },
  {
    id: 902, type_id: "jet", title_uz: "Pumpman JET 100", price: 750000, image_url: imgJET,
    specs: [
      { key: "Turi", value: "Самовсасывающий JET" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.75" }, { key: "Suv sarfi (л/м)", value: "48" },
      { key: "Balandligi (Подъём, m)", value: "46" }
    ]
  },
  {
    id: 903, type_id: "jet", title_uz: "Pumpman TJSW 15M-1 (JET1100)", price: 800000, image_url: imgJET,
    specs: [
      { key: "Turi", value: "Самовсасывающий JET" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "1.1" }, { key: "Suv sarfi (л/м)", value: "50" },
      { key: "Balandligi (Подъём, m)", value: "58" }
    ]
  },
  {
    id: 904, type_id: "jet", title_uz: "Pumpman JET 200", price: 1300000, image_url: imgJET,
    specs: [
      { key: "Turi", value: "Самовсасывающий JET" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "40*25" },
      { key: "Quvvati (кВт)", value: "1.5" }, { key: "Suv sarfi (л/м)", value: "127" },
      { key: "Balandligi (Подъём, m)", value: "50" }
    ]
  },

  // === THF — Центробежный ===
  {
    id: 1001, type_id: "thf", title_uz: "Pumpman TGA1A", price: 750000, image_url: imgTHF,
    specs: [
      { key: "Turi", value: "Центробежный высокопроизводительный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "40*40" },
      { key: "Quvvati (кВт)", value: "0.75" }, { key: "Suv sarfi (л/м)", value: "300" },
      { key: "Balandligi (Подъём, m)", value: "20" }
    ]
  },
  {
    id: 1002, type_id: "thf", title_uz: "Pumpman THF6B", price: 1000000, image_url: imgTHF,
    specs: [
      { key: "Turi", value: "Центробежный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "50*50" },
      { key: "Quvvati (кВт)", value: "1.1" }, { key: "Suv sarfi (л/м)", value: "430" },
      { key: "Balandligi (Подъём, m)", value: "26" }
    ]
  },
  {
    id: 1003, type_id: "thf", title_uz: "Pumpman THF6B-1", price: 1050000, image_url: imgTHF,
    specs: [
      { key: "Turi", value: "Центробежный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "50*50" },
      { key: "Quvvati (кВт)", value: "1.5" }, { key: "Suv sarfi (л/м)", value: "550" },
      { key: "Balandligi (Подъём, m)", value: "22" }
    ]
  },
  {
    id: 1004, type_id: "thf", title_uz: "Pumpman THF5A(6C)", price: 1240000, image_url: imgTHF,
    specs: [
      { key: "Turi", value: "Центробежный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "75*75" },
      { key: "Quvvati (кВт)", value: "1.1" }, { key: "Suv sarfi (л/м)", value: "910" },
      { key: "Balandligi (Подъём, m)", value: "12" }
    ]
  },
  {
    id: 1005, type_id: "thf", title_uz: "Pumpman THF6A-1", price: 1600000, image_url: imgTHF,
    specs: [
      { key: "Turi", value: "Центробежный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "75*75" },
      { key: "Quvvati (кВт)", value: "2.2" }, { key: "Suv sarfi (л/м)", value: "910" },
      { key: "Balandligi (Подъём, m)", value: "14" }
    ]
  },
  {
    id: 1006, type_id: "thf", title_uz: "Pumpman THF5A", price: 1310000, image_url: imgTHF,
    specs: [
      { key: "Turi", value: "Центробежный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "75*75" },
      { key: "Quvvati (кВт)", value: "1.5" }, { key: "Suv sarfi (л/м)", value: "1000" },
      { key: "Balandligi (Подъём, m)", value: "14" }
    ]
  },
  {
    id: 1007, type_id: "thf", title_uz: "Pumpman THF6A", price: 1700000, image_url: imgTHF,
    specs: [
      { key: "Turi", value: "Центробежный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "100*100" },
      { key: "Quvvati (кВт)", value: "2.2" }, { key: "Suv sarfi (л/м)", value: "1080" },
      { key: "Balandligi (Подъём, m)", value: "17" }
    ]
  },
  {
    id: 1008, type_id: "thf", title_uz: "Pumpman THF10A", price: 3300000, image_url: imgTHF,
    specs: [
      { key: "Turi", value: "Центробежный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "100*100" },
      { key: "Quvvati (кВт)", value: "4" }, { key: "Suv sarfi (л/м)", value: "1500" },
      { key: "Balandligi (Подъём, m)", value: "16" }
    ]
  },

  // === 2TCP25 — Центробежный ===
  {
    id: 1101, type_id: "tcp25", title_uz: "Pumpman 2TCP25/140M", price: 1300000, image_url: img2TCP,
    specs: [
      { key: "Turi", value: "Центробежный двухколесный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "40*25" },
      { key: "Quvvati (кВт)", value: "1.1" }, { key: "Suv sarfi (л/м)", value: "125" },
      { key: "Balandligi (Подъём, m)", value: "47" }
    ]
  },
  {
    id: 1102, type_id: "tcp25", title_uz: "Pumpman 2TCP25/160B", price: 1400000, image_url: img2TCP,
    specs: [
      { key: "Turi", value: "Центробежный двухколесный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "40*25" },
      { key: "Quvvati (кВт)", value: "1.5" }, { key: "Suv sarfi (л/м)", value: "133" },
      { key: "Balandligi (Подъём, m)", value: "57" }
    ]
  },
  {
    id: 1103, type_id: "tcp25", title_uz: "Pumpman 2TCP25/160A", price: 1900000, image_url: img2TCP,
    specs: [
      { key: "Turi", value: "Центробежный двухколесный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "40*32" },
      { key: "Quvvati (кВт)", value: "2.2" }, { key: "Suv sarfi (л/м)", value: "158" },
      { key: "Balandligi (Подъём, m)", value: "65" }
    ]
  },

  // === 50WFD11 — Канализационный ===
  {
    id: 1201, type_id: "wfd11", title_uz: "Pumpman 50WFD11-10-1.1GA", price: 1450000, image_url: img50WFD,
    specs: [
      { key: "Turi", value: "Канализационный погружной" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "50*50" },
      { key: "Quvvati (кВт)", value: "1.1" }, { key: "Suv sarfi (л/м)", value: "280" },
      { key: "Balandligi (Подъём, m)", value: "15" }
    ]
  },
  {
    id: 1202, type_id: "wfd11", title_uz: "Pumpman 50WSD11-10-1.1GA", price: 1800000, image_url: img50WFD,
    specs: [
      { key: "Turi", value: "Канализационный погружной" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "50*50" },
      { key: "Quvvati (кВт)", value: "1.1" }, { key: "Suv sarfi (л/м)", value: "280" },
      { key: "Balandligi (Подъём, m)", value: "15" }
    ]
  },

  // === QFD — Погружной ===
  {
    id: 1301, type_id: "qfd", title_uz: "Pumpman QFD15-15-1.1(A)", price: 1300000, image_url: imgQFD,
    specs: [
      { key: "Turi", value: "Погружной центробежный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "63*63" },
      { key: "Quvvati (кВт)", value: "1.1" }, { key: "Suv sarfi (л/м)", value: "580" },
      { key: "Balandligi (Подъём, m)", value: "18" }
    ]
  },
  {
    id: 1302, type_id: "qfd", title_uz: "Pumpman QFD40-7-1.5(A)", price: 1450000, image_url: imgQFD,
    specs: [
      { key: "Turi", value: "Погружной центробежный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "75*75" },
      { key: "Quvvati (кВт)", value: "1.5" }, { key: "Suv sarfi (л/м)", value: "1050" },
      { key: "Balandligi (Подъём, m)", value: "14" }
    ]
  },

  // === ATJSW — Насосная станция ===
  {
    id: 1401, type_id: "atjsw", title_uz: "Pumpman ATJSW/15M-1", price: 1110000, image_url: imgATJSW,
    specs: [
      { key: "Turi", value: "Автоматическая насосная станция" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "1.1" }, { key: "Suv sarfi (л/м)", value: "50" },
      { key: "Balandligi (Подъём, m)", value: "58" }
    ]
  },

  // === STAR — Циркуляционный частотный с фланцем ===
  {
    id: 1501, type_id: "star_f", title_uz: "Pumpman STAR50/12F", price: 6000000, image_url: imgSTAR_F,
    specs: [
      { key: "Turi", value: "Циркуляционный частотный фланцевый" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "50*50" },
      { key: "Quvvati (кВт)", value: "0.56" }, { key: "Suv sarfi (л/м)", value: "380" },
      { key: "Balandligi (Подъём, m)", value: "12" }
    ]
  },
  {
    id: 1502, type_id: "star_f", title_uz: "Pumpman STAR65/15F", price: 6500000, image_url: imgSTAR_F,
    specs: [
      { key: "Turi", value: "Циркуляционный частотный фланцевый" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "63*63" },
      { key: "Quvvati (кВт)", value: "1.3" }, { key: "Suv sarfi (л/м)", value: "815" },
      { key: "Balandligi (Подъём, m)", value: "15" }
    ]
  },

  // === SGJ — Самовсасывающий ===
  {
    id: 1601, type_id: "sgj", title_uz: "Pumpman SGJ600", price: 750000, image_url: imgSGJ,
    specs: [
      { key: "Turi", value: "Самовсасывающий нержавеющий" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.6" }, { key: "Suv sarfi (л/м)", value: "55" },
      { key: "Balandligi (Подъём, m)", value: "43" }
    ]
  },
  {
    id: 1602, type_id: "sgj", title_uz: "Pumpman SGJ800", price: 800000, image_url: imgSGJ,
    specs: [
      { key: "Turi", value: "Самовсасывающий нержавеющий" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.8" }, { key: "Suv sarfi (л/м)", value: "55" },
      { key: "Balandligi (Подъём, m)", value: "48" }
    ]
  },

  // === GS — Дренажный ===
  {
    id: 1701, type_id: "gs", title_uz: "Pumpman GS400", price: 480000, image_url: imgGS,
    specs: [
      { key: "Turi", value: "Дренажный пластиковый" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "40*40" },
      { key: "Quvvati (кВт)", value: "0.4" }, { key: "Suv sarfi (л/м)", value: "146" },
      { key: "Balandligi (Подъём, m)", value: "5.5" }
    ]
  },
  {
    id: 1702, type_id: "gs", title_uz: "Pumpman GS550", price: 490000, image_url: imgGS,
    specs: [
      { key: "Turi", value: "Дренажный пластиковый" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "40*40" },
      { key: "Quvvati (кВт)", value: "0.55" }, { key: "Suv sarfi (л/м)", value: "191" },
      { key: "Balandligi (Подъём, m)", value: "6.5" }
    ]
  },
  {
    id: 1703, type_id: "gs", title_uz: "Pumpman GS750", price: 500000, image_url: imgGS,
    specs: [
      { key: "Turi", value: "Дренажный пластиковый" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "40*40" },
      { key: "Quvvati (кВт)", value: "0.75" }, { key: "Suv sarfi (л/м)", value: "205" },
      { key: "Balandligi (Подъём, m)", value: "7.5" }
    ]
  },

  // === CHLFT(T) — Центробежный для горячей воды ===
  {
    id: 1801, type_id: "chlft", title_uz: "Pumpman CHLFT(T) 2-60R", price: 1650000, image_url: imgCHLFT,
    specs: [
      { key: "Turi", value: "Горизонтальный многоступенчатый (горячая вода)" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.75" }, { key: "Suv sarfi (л/м)", value: "580" },
      { key: "Balandligi (Подъём, m)", value: "53" }
    ]
  },

  // === CHM — Центробежный для горячей воды ===
  {
    id: 1901, type_id: "chm", title_uz: "Pumpman CHM4-4R", price: 1600000, image_url: imgCHM,
    specs: [
      { key: "Turi", value: "Центробежный (горячая вода)" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "32*25" },
      { key: "Quvvati (кВт)", value: "0.75" }, { key: "Suv sarfi (л/м)", value: "116" },
      { key: "Balandligi (Подъём, m)", value: "38" }
    ]
  },
  {
    id: 1902, type_id: "chm", title_uz: "Pumpman CHM8-3R", price: 2700000, image_url: imgCHM,
    specs: [
      { key: "Turi", value: "Центробежный (горячая вода)" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "40*40" },
      { key: "Quvvati (кВт)", value: "1.1" }, { key: "Suv sarfi (л/м)", value: "180" },
      { key: "Balandligi (Подъём, m)", value: "30" }
    ]
  },
  {
    id: 1903, type_id: "chm", title_uz: "Pumpman CHL8-50R", price: 4000000, image_url: imgCHM,
    specs: [
      { key: "Turi", value: "Центробежный (горячая вода)" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "40*40" },
      { key: "Quvvati (кВт)", value: "2.2" }, { key: "Suv sarfi (л/м)", value: "180" },
      { key: "Balandligi (Подъём, m)", value: "51" }
    ]
  },

  // === TW — Периферийный ===
  {
    id: 2001, type_id: "tw", title_uz: "Pumpman TW-550T", price: 620000, image_url: imgTW,
    specs: [
      { key: "Turi", value: "Периферийный вихревой" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.55" }, { key: "Suv sarfi (л/м)", value: "50" },
      { key: "Balandligi (Подъём, m)", value: "42" }
    ]
  },
  {
    id: 2002, type_id: "tw", title_uz: "Pumpman TW-750T", price: 630000, image_url: imgTW,
    specs: [
      { key: "Turi", value: "Периферийный вихревой" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.75" }, { key: "Suv sarfi (л/м)", value: "56" },
      { key: "Balandligi (Подъём, m)", value: "50" }
    ]
  },

  // === GRD — Рециркуляция Латунь ===
  {
    id: 2101, type_id: "grd", title_uz: "Pumpman GRD 15/15", price: 550000, image_url: imgGRD,
    specs: [
      { key: "Turi", value: "Рециркуляционный латунный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "15*15" },
      { key: "Quvvati (кВт)", value: "0.03" }, { key: "Suv sarfi (л/м)", value: "10" },
      { key: "Balandligi (Подъём, m)", value: "1.5" }
    ]
  },

  // === STAR — Циркуляционный частотный ===
  {
    id: 2201, type_id: "star_c", title_uz: "Pumpman NEW STAR 25/6-180", price: 650000, image_url: imgSTAR_C,
    specs: [
      { key: "Turi", value: "Циркуляционный частотный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.3" }, { key: "Suv sarfi (л/м)", value: "58" },
      { key: "Balandligi (Подъём, m)", value: "6" }
    ]
  },
  {
    id: 2202, type_id: "star_c", title_uz: "Pumpman NEW STAR 32/6-180", price: 680000, image_url: imgSTAR_C,
    specs: [
      { key: "Turi", value: "Циркуляционный частотный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "32*32" },
      { key: "Quvvati (кВт)", value: "0.3" }, { key: "Suv sarfi (л/м)", value: "63" },
      { key: "Balandligi (Подъём, m)", value: "6" }
    ]
  },
  {
    id: 2203, type_id: "star_c", title_uz: "Pumpman NEW STAR 25/8-180", price: 720000, image_url: imgSTAR_C,
    specs: [
      { key: "Turi", value: "Циркуляционный частотный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "0.5" }, { key: "Suv sarfi (л/м)", value: "63" },
      { key: "Balandligi (Подъём, m)", value: "8" }
    ]
  },
  {
    id: 2204, type_id: "star_c", title_uz: "Pumpman NEW STAR 32/8-180", price: 750000, image_url: imgSTAR_C,
    specs: [
      { key: "Turi", value: "Циркуляционный частотный" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "32*32" },
      { key: "Quvvati (кВт)", value: "0.5" }, { key: "Suv sarfi (л/м)", value: "66" },
      { key: "Balandligi (Подъём, m)", value: "8" }
    ]
  },

  // === PM-01 — Пресс-контроль ===
  {
    id: 2301, type_id: "pm01", title_uz: "Pumpman PM-01 (Пресс-контроль)", price: 160000, image_url: imgPM01,
    specs: [
      { key: "Turi", value: "Блок автоматики (Пресс-контроль)" }, { key: "Kirish/Chiqish (Вх/Вых)", value: "25*25" },
      { key: "Quvvati (кВт)", value: "1.1" }, { key: "Ishlash tartibi", value: "Avtomatik boshqaruv" }
    ]
  }
];

export default function KatalogTab() {
  const [selectedType, setSelectedType] = useState(null); // Tanlangan toifa state-i
  const [selectedProduct, setSelectedProduct] = useState(null); // Tanlangan model state-i

  const navigate = useNavigate();

  // Tanlangan turga tegishli modellarni ajratib olish
  const filteredProducts = MOCK_PRODUCTS.filter(
    (prod) => selectedType && prod.type_id === selectedType.id
  );

  // === BOSQICH 3: MODELNING TEXNIK XUSUSIYATLARI ===
  if (selectedProduct) {
    return (
      <div className="katalog-light-wrapper">
        <button className="katalog-back-btn" onClick={() => setSelectedProduct(null)}>
          <FiArrowLeft size={16} /> Orqaga
        </button>

        <div className="product-detail-container" style={{ marginTop: "20px" }}>
          <div className="product-detail-main">
            <div className="product-detail-img">
              <img src={selectedProduct.image_url} alt={selectedProduct.title_uz} />
            </div>
            <div className="product-detail-info">
              <h3 className="product-detail-title">{selectedProduct.title_uz}</h3>
              <p className="product-detail-price" style={{ color: "#2563eb", fontWeight: "bold", fontSize: "20px" }}>
                Narxi: {selectedProduct.price ? `${selectedProduct.price.toLocaleString()} so'm` : "Kelishilgan narx"}
              </p>
            </div>
          </div>

          {selectedProduct.specs && selectedProduct.specs.length > 0 && (
            <div className="product-specs-section" style={{ marginTop: "20px" }}>
              <h4 style={{ marginBottom: "10px", color: "#1e293b" }}>Texnik xususiyatlari (Характеристики):</h4>
              <table className="specs-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  {selectedProduct.specs.map((spec, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <td className="spec-key" style={{ padding: "10px", fontWeight: "bold", color: "#64748b" }}>{spec.key}</td>
                      <td className="spec-value" style={{ padding: "10px", color: "#1e293b", textAlign: "right" }}>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  // === BOSQICH 2: MODELLAR RO'YXATI ===
  if (selectedType) {
    return (
      <div className="katalog-light-wrapper">
        <button className="katalog-back-btn" onClick={() => setSelectedType(null)}>
          <FiArrowLeft size={16} /> Orqaga
        </button>
        <br />
        <div className="inner-title-box" style={{ marginTop: "15px" }}>
          <h2>{selectedType.name_uz}</h2>
          <span className="badge" style={{ background: "#e0f2fe", color: "#0369a1", padding: "4px 8px", borderRadius: "6px", fontSize: "14px" }}>
            {filteredProducts.length} ta model mavjud
          </span>
        </div>
        <br />

        {filteredProducts.length === 0 ? (
          <div className="no-data-box" style={{ textAlign: "center", padding: "40px" }}>
            <FiPackage size={44} style={{ color: "#94a3b8" }} />
            <p style={{ color: "#64748b", marginTop: "10px" }}>Bu turda hozircha modellar mavjud emas.</p>
          </div>
        ) : (
          <div className="products-light-grid">
            {filteredProducts.map((prod) => (
              <div 
                key={prod.id} 
                className="product-light-card" 
                onClick={() => setSelectedProduct(prod)}
                style={{ 
                  cursor: "pointer", 
                  border: "1px solid #e2e8f0", 
                  borderRadius: "12px", 
                  padding: "15px", 
                  background: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <div className="product-img-box" style={{ height: "150px", display: "flex", alignItems: "center" }}>
                  <img src={prod.image_url} alt={prod.title_uz} style={{ maxHeight: "100%", maxWidth: "100%" }} />
                </div>
                <div className="product-details" style={{ marginTop: "10px", textAlign: "center" }}>
                  <h4 className="product-title" style={{ fontSize: "16px", fontWeight: "600" }}>{prod.title_uz}</h4>
                  <p className="product-price" style={{ color: "#2563eb", fontWeight: "bold", marginTop: "5px" }}>
                    {prod.price ? `${prod.price.toLocaleString()} so'm` : "Kelishilgan narx"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // === BOSQICH 1: ASOSIY NASOS TURLARI (KATEGORIYALARI) ===
  return (
    <div className="katalog-light-wrapper">
      <button className="katalog-back-btn" onClick={() => navigate('/')}>
        <FiArrowLeft size={16} /> Asosiy sahifaga qaytish
      </button> 
      <br />
      
      <div className="section-divider" style={{ marginTop: "20px", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "24px", color: "#3b62e6" }}>Nasoslar Katalogi</h2>
        <span className="badge-count" style={{ background: "#3b82f6", color: "#fff", padding: "2px 8px", borderRadius: "10px", fontSize: "14px" }}>
          {NASOS_TYPES.length} ta tur
        </span>
      </div>

      <div className="categories-light-grid" style={{ display: "grid", gap: "12px" }}>
        {NASOS_TYPES.map((type) => (
          <div 
            key={type.id} 
            className="category-light-card" 
            onClick={() => setSelectedType(type)}
            style={{ 
              cursor: "pointer", 
              border: "1px solid #e2e8f0", 
              borderRadius: "10px", 
              background: "#fff",
              transition: "0.2s"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" }}>
              <h2 style={{ fontSize: "18px", margin: "0", color: "#1e293b" }}>{type.name_uz}</h2>
              <FaArrowRight style={{ fontSize: "18px", color: "#3b82f6" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}