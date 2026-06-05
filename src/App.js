import React, { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// ── Firebase config ──────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyCY9ehA9EU6X209PPp9kCF_T8kvMK4GGFQ",
  authDomain: "urbies-world-cup.firebaseapp.com",
  projectId: "urbies-world-cup",
  storageBucket: "urbies-world-cup.firebasestorage.app",
  messagingSenderId: "561511617896",
  appId: "1:561511617896:web:b58c607e5395e77d2432dd"
};
const firebaseApp = initializeApp(firebaseConfig);
const fsdb = getFirestore(firebaseApp);
const DATA_DOC = doc(fsdb, "urbies", "data");

async function dbRead() {
  const snap = await getDoc(DATA_DOC);
  return snap.exists() ? snap.data() : {};
}
async function dbWrite(data) {
  await setDoc(DATA_DOC, data);
}
// ────────────────────────────────────────────────────────────

const ADMIN = "MONICA";
const DEFAULT_PARTICIPANTS = [
  { name:"CARLOS",  pass:"carlos123"  },
  { name:"ANDRÉS",  pass:"andres123"  },
  { name:"NATHA",   pass:"natha123"   },
  { name:"KAREN",   pass:"karen123"   },
  { name:"SHAROM",  pass:"sharom123"  },
  { name:"MONICA",  pass:"monica123"  },
  { name:"FELIPE",  pass:"felipe123"  },
  { name:"JIME",    pass:"jime123"    },
];

const GROUPS = {
  A:["México","Sudáfrica","Corea del Sur","Chequia"],
  B:["Canadá","Bosnia y Herz.","Qatar","Suiza"],
  C:["Brasil","Marruecos","Haití","Escocia"],
  D:["Estados Unidos","Paraguay","Australia","Turquía"],
  E:["Alemania","Curazao","Costa de Marfil","Ecuador"],
  F:["Países Bajos","Japón","Suecia","Túnez"],
  G:["Bélgica","Egipto","Irán","Nueva Zelanda"],
  H:["España","Cabo Verde","Arabia Saudita","Uruguay"],
  I:["Francia","Senegal","Irak","Noruega"],
  J:["Argentina","Argelia","Austria","Jordania"],
  K:["Portugal","RD Congo","Uzbekistán","Colombia"],
  L:["Inglaterra","Croacia","Ghana","Panamá"],
};

const MATCHES_RAW = [
  {id:1,g:"A",h:"México",a:"Sudáfrica",date:"11 Jun"},{id:2,g:"A",h:"Corea del Sur",a:"Chequia",date:"11 Jun"},
  {id:3,g:"B",h:"Canadá",a:"Bosnia y Herz.",date:"12 Jun"},{id:4,g:"B",h:"Qatar",a:"Suiza",date:"12 Jun"},
  {id:5,g:"C",h:"Brasil",a:"Marruecos",date:"13 Jun"},{id:6,g:"C",h:"Haití",a:"Escocia",date:"13 Jun"},
  {id:7,g:"D",h:"Estados Unidos",a:"Paraguay",date:"12 Jun"},{id:8,g:"D",h:"Australia",a:"Turquía",date:"13 Jun"},
  {id:9,g:"E",h:"Alemania",a:"Costa de Marfil",date:"14 Jun"},{id:10,g:"E",h:"Ecuador",a:"Curazao",date:"14 Jun"},
  {id:11,g:"F",h:"Países Bajos",a:"Suecia",date:"14 Jun"},{id:12,g:"F",h:"Túnez",a:"Japón",date:"14 Jun"},
  {id:13,g:"G",h:"España",a:"Cabo Verde",date:"15 Jun"},{id:14,g:"G",h:"Bélgica",a:"Egipto",date:"15 Jun"},
  {id:15,g:"H",h:"Arabia Saudita",a:"Uruguay",date:"15 Jun"},{id:16,g:"H",h:"Irán",a:"Nueva Zelanda",date:"15 Jun"},
  {id:17,g:"I",h:"Francia",a:"Senegal",date:"16 Jun"},{id:18,g:"I",h:"Irak",a:"Noruega",date:"16 Jun"},
  {id:19,g:"J",h:"Argentina",a:"Argelia",date:"16 Jun"},{id:20,g:"J",h:"Austria",a:"Jordania",date:"16 Jun"},
  {id:21,g:"K",h:"Portugal",a:"RD Congo",date:"17 Jun"},{id:22,g:"K",h:"Uzbekistán",a:"Colombia",date:"17 Jun"},
  {id:23,g:"L",h:"Inglaterra",a:"Croacia",date:"17 Jun"},{id:24,g:"L",h:"Ghana",a:"Panamá",date:"17 Jun"},
  {id:25,g:"A",h:"México",a:"Corea del Sur",date:"18 Jun"},{id:26,g:"A",h:"Sudáfrica",a:"Chequia",date:"18 Jun"},
  {id:27,g:"B",h:"Canadá",a:"Qatar",date:"19 Jun"},{id:28,g:"B",h:"Bosnia y Herz.",a:"Suiza",date:"19 Jun"},
  {id:29,g:"C",h:"Brasil",a:"Haití",date:"19 Jun"},{id:30,g:"C",h:"Marruecos",a:"Escocia",date:"20 Jun"},
  {id:31,g:"D",h:"Estados Unidos",a:"Australia",date:"20 Jun"},{id:32,g:"D",h:"Turquía",a:"Paraguay",date:"20 Jun"},
  {id:33,g:"E",h:"Alemania",a:"Ecuador",date:"21 Jun"},{id:34,g:"E",h:"Curazao",a:"Costa de Marfil",date:"21 Jun"},
  {id:35,g:"F",h:"Países Bajos",a:"Túnez",date:"21 Jun"},{id:36,g:"F",h:"Japón",a:"Suecia",date:"21 Jun"},
  {id:37,g:"G",h:"Bélgica",a:"Irán",date:"22 Jun"},{id:38,g:"G",h:"Nueva Zelanda",a:"Egipto",date:"22 Jun"},
  {id:39,g:"H",h:"España",a:"Arabia Saudita",date:"22 Jun"},{id:40,g:"H",h:"Uruguay",a:"Cabo Verde",date:"22 Jun"},
  {id:41,g:"I",h:"Francia",a:"Irak",date:"23 Jun"},{id:42,g:"I",h:"Senegal",a:"Noruega",date:"23 Jun"},
  {id:43,g:"J",h:"Argentina",a:"Austria",date:"23 Jun"},{id:44,g:"J",h:"Argelia",a:"Jordania",date:"23 Jun"},
  {id:45,g:"K",h:"Portugal",a:"Uzbekistán",date:"23 Jun"},{id:46,g:"K",h:"Colombia",a:"RD Congo",date:"23 Jun"},
  {id:47,g:"L",h:"Inglaterra",a:"Ghana",date:"24 Jun"},{id:48,g:"L",h:"Croacia",a:"Panamá",date:"24 Jun"},
  {id:49,g:"A",h:"Chequia",a:"México",date:"24 Jun"},{id:50,g:"A",h:"Sudáfrica",a:"Corea del Sur",date:"24 Jun"},
  {id:51,g:"B",h:"Bosnia y Herz.",a:"Qatar",date:"25 Jun"},{id:52,g:"B",h:"Suiza",a:"Canadá",date:"25 Jun"},
  {id:53,g:"C",h:"Escocia",a:"Brasil",date:"25 Jun"},{id:54,g:"C",h:"Marruecos",a:"Haití",date:"25 Jun"},
  {id:55,g:"D",h:"Turquía",a:"Estados Unidos",date:"26 Jun"},{id:56,g:"D",h:"Paraguay",a:"Australia",date:"26 Jun"},
  {id:57,g:"E",h:"Curazao",a:"Alemania",date:"26 Jun"},{id:58,g:"E",h:"Costa de Marfil",a:"Ecuador",date:"26 Jun"},
  {id:59,g:"F",h:"Japón",a:"Países Bajos",date:"26 Jun"},{id:60,g:"F",h:"Suecia",a:"Túnez",date:"26 Jun"},
  {id:61,g:"G",h:"Egipto",a:"Bélgica",date:"26 Jun"},{id:62,g:"G",h:"Nueva Zelanda",a:"Irán",date:"26 Jun"},
  {id:63,g:"H",h:"Uruguay",a:"España",date:"26 Jun"},{id:64,g:"H",h:"Cabo Verde",a:"Arabia Saudita",date:"26 Jun"},
  {id:65,g:"I",h:"Noruega",a:"Francia",date:"27 Jun"},{id:66,g:"I",h:"Senegal",a:"Irak",date:"27 Jun"},
  {id:67,g:"J",h:"Argelia",a:"Austria",date:"27 Jun"},{id:68,g:"J",h:"Jordania",a:"Argentina",date:"27 Jun"},
  {id:69,g:"K",h:"Colombia",a:"Portugal",date:"27 Jun"},{id:70,g:"K",h:"RD Congo",a:"Uzbekistán",date:"27 Jun"},
  {id:71,g:"L",h:"Croacia",a:"Ghana",date:"27 Jun"},{id:72,g:"L",h:"Panamá",a:"Inglaterra",date:"27 Jun"},
];

const FLAG = {
  "México":"🇲🇽","Sudáfrica":"🇿🇦","Corea del Sur":"🇰🇷","Chequia":"🇨🇿","Canadá":"🇨🇦",
  "Bosnia y Herz.":"🇧🇦","Qatar":"🇶🇦","Suiza":"🇨🇭","Brasil":"🇧🇷","Marruecos":"🇲🇦",
  "Haití":"🇭🇹","Escocia":"🏴󠁧󠁢󠁳󠁣󠁴󠁿","Estados Unidos":"🇺🇸","Paraguay":"🇵🇾","Australia":"🇦🇺","Turquía":"🇹🇷",
  "Alemania":"🇩🇪","Curazao":"🇨🇼","Costa de Marfil":"🇨🇮","Ecuador":"🇪🇨","Países Bajos":"🇳🇱",
  "Japón":"🇯🇵","Suecia":"🇸🇪","Túnez":"🇹🇳","España":"🇪🇸","Cabo Verde":"🇨🇻",
  "Arabia Saudita":"🇸🇦","Uruguay":"🇺🇾","Bélgica":"🇧🇪","Egipto":"🇪🇬","Irán":"🇮🇷",
  "Nueva Zelanda":"🇳🇿","Francia":"🇫🇷","Senegal":"🇸🇳","Irak":"🇮🇶","Noruega":"🇳🇴",
  "Argentina":"🇦🇷","Argelia":"🇩🇿","Austria":"🇦🇹","Jordania":"🇯🇴","Portugal":"🇵🇹",
  "RD Congo":"🇨🇩","Uzbekistán":"🇺🇿","Colombia":"🇨🇴","Inglaterra":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","Croacia":"🇭🇷",
  "Ghana":"🇬🇭","Panamá":"🇵🇦",
};

const GC = {"A":"#ef4444","B":"#f97316","C":"#eab308","D":"#22c55e","E":"#14b8a6","F":"#3b82f6","G":"#8b5cf6","H":"#ec4899","I":"#06b6d4","J":"#f59e0b","K":"#64748b","L":"#7c3aed"};
const BG="#0d1b2e", BG2="#112240", CARD="rgba(255,255,255,0.07)", BORDER="rgba(255,255,255,0.12)";

const MATCH_DATES = {
  "11 Jun":"2026-06-11","12 Jun":"2026-06-12","13 Jun":"2026-06-13","14 Jun":"2026-06-14",
  "15 Jun":"2026-06-15","16 Jun":"2026-06-16","17 Jun":"2026-06-17","18 Jun":"2026-06-18",
  "19 Jun":"2026-06-19","20 Jun":"2026-06-20","21 Jun":"2026-06-21","22 Jun":"2026-06-22",
  "23 Jun":"2026-06-23","24 Jun":"2026-06-24","25 Jun":"2026-06-25","26 Jun":"2026-06-26","27 Jun":"2026-06-27",
};
function isMatchLocked(dateStr) {
  const d = MATCH_DATES[dateStr]; if(!d) return false;
  return new Date() >= new Date(d + "T05:00:00Z");
}
function calcPts(pred, real) {
  if(!real||real.h===""||real.a==="") return null;
  const ph=parseInt(pred.h),pa=parseInt(pred.a),rh=parseInt(real.h),ra=parseInt(real.a);
  if(isNaN(ph)||isNaN(pa)) return null;
  if(ph===rh&&pa===ra) return 3;
  const pw=ph>pa?"h":ph<pa?"a":"e", rw=rh>ra?"h":rh<ra?"a":"e";
  return pw===rw?1:0;
}

function TrophyIcon({size=60}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M30,8 L70,8 L70,46 Q70,72 50,77 Q30,72 30,46 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
      <path d="M36,12 Q38,32 38,46 Q42,64 50,70 Q44,63 40,46 Q38,30 38,13 Z" fill="#fde68a" opacity="0.55"/>
      <path d="M30,16 Q13,16 13,33 Q13,49 29,52" fill="none" stroke="#f59e0b" strokeWidth="7" strokeLinecap="round"/>
      <path d="M70,16 Q87,16 87,33 Q87,49 71,52" fill="none" stroke="#f59e0b" strokeWidth="7" strokeLinecap="round"/>
      <rect x="44" y="76" width="12" height="9" fill="#d97706"/>
      <rect x="33" y="85" width="34" height="5" rx="2" fill="#b45309"/>
      <rect x="27" y="90" width="46" height="7" rx="3" fill="#92400e"/>
      <polygon points="50,20 52.5,27 60,27 54,31.5 56.5,38.5 50,34 43.5,38.5 46,31.5 40,27 47.5,27" fill="white" opacity="0.9"/>
    </svg>
  );
}
function UrbgLogoIcon({size=36}) {
  return (
    <svg width={size} height={Math.round(size*1.12)} viewBox="0 0 100 112" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="112" rx="12" fill="#000"/>
      <text x="55" y="30" fontFamily="Arial Black,Arial" fontWeight="900" fontSize="22" fill="white" textAnchor="middle">URBG</text>
      <polygon points="22,42 22,95 58,68" fill="#f0f0f0"/>
      <polygon points="22,95 58,68 78,95" fill="#c0c0c0"/>
    </svg>
  );
}
function UrbgLogoFull({width=280}) {
  return (
    <svg width={width} height={Math.round(width*0.28)} viewBox="0 0 400 110" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="110" rx="10" fill="#000"/>
      <polygon points="18,15 18,85 52,50" fill="#f0f0f0"/>
      <polygon points="18,85 52,50 72,85" fill="#c0c0c0"/>
      <text x="90" y="48" fontFamily="Arial Black,Arial" fontWeight="900" fontSize="32" fill="white">URBANIC GROUP</text>
      <text x="91" y="72" fontFamily="Arial,sans-serif" fontWeight="300" fontSize="14" fill="#999" letterSpacing="4">INTERNATIONAL CONSULTING</text>
    </svg>
  );
}

export default function App() {
  const [user, setUser]           = useState(null);
  const [appDb, setAppDb]         = useState({ predictions:{}, results:{}, locked:{}, extraMatches:[] });
  const [loginName, setLoginName] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginErr, setLoginErr]   = useState("");
  const [view, setView]           = useState("predicciones");
  const [filterGroup, setFilterGroup] = useState("ALL");
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState(false);
  const [participants, setParticipants] = useState(DEFAULT_PARTICIPANTS);
  const [showChangePass, setShowChangePass] = useState(false);
  const [newPass1, setNewPass1]   = useState("");
  const [newPass2, setNewPass2]   = useState("");
  const [passMsg, setPassMsg]     = useState("");
  // Admin — participantes
  const [adminNewName, setAdminNewName] = useState("");
  const [adminNewPass, setAdminNewPass] = useState("");
  const [adminEditIdx, setAdminEditIdx] = useState(null);
  const [adminEditName, setAdminEditName] = useState("");
  const [adminEditPass, setAdminEditPass] = useState("");
  const [adminMsg, setAdminMsg]   = useState("");
  // Admin — resultados
  const [resFilterGroup, setResFilterGroup] = useState("ALL");
  const [editResults, setEditResults] = useState({});
  const [resMsg, setResMsg]       = useState("");
  // Admin — partidos extra (fases eliminatorias)
  const [newMatchH, setNewMatchH] = useState("");
  const [newMatchA, setNewMatchA] = useState("");
  const [newMatchDate, setNewMatchDate] = useState("");
  const [newMatchPhase, setNewMatchPhase] = useState("Octavos");
  const [matchMsg, setMatchMsg]   = useState("");

  const appDbRef = useRef(appDb);
  appDbRef.current = appDb;
  const participantsRef = useRef(participants);
  participantsRef.current = participants;

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    try {
      const data = await dbRead();
      setAppDb({ predictions: data.predictions||{}, results: data.results||{}, locked: data.locked||{}, extraMatches: data.extraMatches||[] });
      if(data.participants && data.participants.length > 0) setParticipants(data.participants);
    } catch(e) { console.error("Error cargando datos", e); }
    setLoading(false);
  }

  async function saveDb(next) {
    setSaving(true);
    setAppDb(next);
    try {
      await dbWrite({...next, participants: participantsRef.current});
      setSaved(true); setTimeout(()=>setSaved(false),1500);
    } catch(e) { console.error("Error guardando", e); }
    setSaving(false);
  }

  async function saveParticipants(next) {
    setParticipants(next);
    try { await dbWrite({...appDbRef.current, participants: next}); } catch(e) { console.error(e); }
  }

  async function changePassword() {
    if(newPass1.length < 4) { setPassMsg("❌ Mínimo 4 caracteres"); return; }
    if(newPass1 !== newPass2) { setPassMsg("❌ Las contraseñas no coinciden"); return; }
    setPassMsg("⏳ Guardando...");
    const nextParticipants = participantsRef.current.map(p => p.name === user ? {...p, pass: newPass1} : p);
    try {
      await dbWrite({...appDbRef.current, participants: nextParticipants});
      setParticipants(nextParticipants);
      setPassMsg("✅ ¡Contraseña cambiada!");
      setNewPass1(""); setNewPass2("");
      setTimeout(() => { setShowChangePass(false); setPassMsg(""); }, 2000);
    } catch(e) {
      setPassMsg("❌ Error: " + e.message);
    }
  }

  // ── Admin: participantes ──
  function adminAddParticipant() {
    const name = adminNewName.trim().toUpperCase();
    const pass = adminNewPass.trim();
    if(!name||!pass) { setAdminMsg("❌ Completa nombre y contraseña"); return; }
    if(participants.find(p=>p.name===name)) { setAdminMsg("❌ Ese nombre ya existe"); return; }
    const next = [...participants, {name, pass}];
    saveParticipants(next);
    setAdminNewName(""); setAdminNewPass("");
    setAdminMsg("✅ Participante agregado");
    setTimeout(()=>setAdminMsg(""),2000);
  }
  function adminDeleteParticipant(name) {
    if(name===ADMIN) { setAdminMsg("❌ No puedes eliminar al admin"); return; }
    if(!window.confirm(`¿Eliminar a ${name}?`)) return;
    saveParticipants(participants.filter(p=>p.name!==name));
    setAdminMsg("✅ Eliminado"); setTimeout(()=>setAdminMsg(""),2000);
  }
  function adminStartEdit(idx) {
    setAdminEditIdx(idx);
    setAdminEditName(participants[idx].name);
    setAdminEditPass(participants[idx].pass);
  }
  function adminSaveEdit() {
    const name = adminEditName.trim().toUpperCase();
    const pass = adminEditPass.trim();
    if(!name||!pass) { setAdminMsg("❌ Completa los campos"); return; }
    const next = participants.map((p,i)=>i===adminEditIdx?{name,pass}:p);
    saveParticipants(next);
    setAdminEditIdx(null);
    setAdminMsg("✅ Actualizado"); setTimeout(()=>setAdminMsg(""),2000);
  }

  // ── Admin: resultados manuales ──
  function handleResChange(matchId, side, val) {
    setEditResults(prev => ({
      ...prev,
      [matchId]: { ...(prev[matchId]||{h:"",a:""}), [side]: val }
    }));
  }
  async function saveResult(matchId) {
    const r = editResults[matchId];
    if(!r || r.h==="" || r.a==="") { setResMsg("❌ Ingresa ambos marcadores"); setTimeout(()=>setResMsg(""),2000); return; }
    if(isNaN(parseInt(r.h))||isNaN(parseInt(r.a))) { setResMsg("❌ Solo números"); setTimeout(()=>setResMsg(""),2000); return; }
    setResMsg("⏳ Guardando...");
    const nextResults = {...appDbRef.current.results, [Number(matchId)]: {h: String(parseInt(r.h)), a: String(parseInt(r.a))}};
    const nextDb = {...appDbRef.current, results: nextResults};
    try {
      await dbWrite({...nextDb, participants: participantsRef.current});
      setAppDb(nextDb);
      setEditResults(prev => { const n={...prev}; delete n[matchId]; return n; });
      setResMsg("✅ Resultado guardado");
    } catch(e) { setResMsg("❌ Error: " + e.message); }
    setTimeout(()=>setResMsg(""),2500);
  }
  async function clearResult(matchId) {
    if(!window.confirm("¿Borrar este resultado?")) return;
    const nextResults = {...appDbRef.current.results};
    delete nextResults[Number(matchId)];
    const nextDb = {...appDbRef.current, results: nextResults};
    try {
      await dbWrite({...nextDb, participants: participantsRef.current});
      setAppDb(nextDb);
      setResMsg("✅ Resultado borrado");
    } catch(e) { setResMsg("❌ Error: " + e.message); }
    setTimeout(()=>setResMsg(""),2000);
  }

  function getPass(name){ return participants.find(p=>p.name===name)?.pass||""; }
  function login(){
    const p=participants.find(p=>p.name===loginName);
    if(p&&loginPass===getPass(loginName)){setUser(p.name);setLoginErr("");}
    else setLoginErr("❌ Nombre o contraseña incorrectos");
  }
  function isLocked(matchId, dateStr) {
    return appDb.locked[Number(matchId)] || isMatchLocked(dateStr);
  }

  async function toggleLock(matchId) {
    const cur = appDbRef.current;
    const nextLocked = {...cur.locked, [Number(matchId)]: !cur.locked[Number(matchId)]};
    const nextDb = {...cur, locked: nextLocked};
    try {
      await dbWrite({...nextDb, participants: participantsRef.current});
      setAppDb(nextDb);
      setResMsg(nextLocked[matchId] ? "🔒 Apuestas cerradas" : "🔓 Apuestas abiertas");
    } catch(e) { setResMsg("❌ Error: " + e.message); }
    setTimeout(()=>setResMsg(""),2000);
  }

  async function addExtraMatch() {
    if(!newMatchH.trim()||!newMatchA.trim()||!newMatchDate.trim()){
      setMatchMsg("❌ Completa todos los campos"); setTimeout(()=>setMatchMsg(""),2000); return;
    }
    const cur = appDbRef.current;
    const existingExtras = cur.extraMatches||[];
    const maxId = Math.max(1000, ...existingExtras.map(m=>m.id), ...[72]);
    const newMatch = {
      id: maxId+1,
      g: newMatchPhase,
      h: newMatchH.trim(),
      a: newMatchA.trim(),
      date: newMatchDate.trim(),
      phase: newMatchPhase
    };
    const nextDb = {...cur, extraMatches:[...existingExtras, newMatch]};
    try {
      await dbWrite({...nextDb, participants: participantsRef.current});
      setAppDb(nextDb);
      setNewMatchH(""); setNewMatchA(""); setNewMatchDate("");
      setMatchMsg("✅ Partido agregado");
    } catch(e) { setMatchMsg("❌ Error: "+e.message); }
    setTimeout(()=>setMatchMsg(""),2500);
  }

  async function deleteExtraMatch(matchId) {
    if(!window.confirm("¿Eliminar este partido?")) return;
    const cur = appDbRef.current;
    const nextExtras = (cur.extraMatches||[]).filter(m=>m.id!==matchId);
    const nextResults = {...cur.results};
    delete nextResults[String(matchId)];
    const nextLocked = {...cur.locked};
    delete nextLocked[String(matchId)];
    const nextDb = {...cur, extraMatches:nextExtras, results:nextResults, locked:nextLocked};
    try {
      await dbWrite({...nextDb, participants: participantsRef.current});
      setAppDb(nextDb);
      setMatchMsg("✅ Partido eliminado");
    } catch(e) { setMatchMsg("❌ Error: "+e.message); }
    setTimeout(()=>setMatchMsg(""),2000);
  }

  async function savePrediction(matchId,h,a){
    const key=`${user}_${matchId}`;
    await saveDb({...appDb, predictions:{...appDb.predictions,[key]:{h,a}}});
  }
  function getScore(participant){
    let pts=0;
    const all=[...MATCHES_RAW, ...(appDb.extraMatches||[])];
    all.forEach(m=>{
      const pred=appDb.predictions[`${participant}_${m.id}`];
      const real=appDb.results[m.id]||appDb.results[String(m.id)];
      if(pred&&real){const p=calcPts(pred,real);if(p!==null)pts+=p;}
    });
    return pts;
  }
  function getScoreMap(){ return participants.map(p=>({name:p.name,pts:getScore(p.name)})).sort((a,b)=>b.pts-a.pts); }

  const allMatches = [...MATCHES_RAW, ...(appDb.extraMatches||[])];
  const filteredMatches = filterGroup==="ALL"?allMatches:allMatches.filter(m=>m.g===filterGroup||m.phase===filterGroup);
  const resFilteredMatches = resFilterGroup==="ALL"?allMatches:allMatches.filter(m=>m.g===resFilterGroup||m.phase===resFilterGroup);
  const inp = {width:"100%",padding:"11px 14px",borderRadius:10,border:`1px solid ${BORDER}`,background:"rgba(255,255,255,0.08)",color:"white",fontSize:16,outline:"none",boxSizing:"border-box"};
  const numInp = {width:46,textAlign:"center",padding:"8px 2px",borderRadius:10,border:`1px solid ${BORDER}`,background:"rgba(255,255,255,0.12)",color:"white",fontSize:20,fontWeight:900,outline:"none"};

  if(loading) return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:BG}}>
      <div style={{textAlign:"center"}}><TrophyIcon size={72}/>
        <div style={{marginTop:16,color:"#7aadda",fontSize:15}}>Cargando Urbies World Cup...</div>
      </div>
    </div>
  );

  if(!user) return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${BG} 0%,#0a2540 60%,#0d1b2e 100%)`,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{width:"100%",maxWidth:400}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <TrophyIcon size={90}/>
          <h1 style={{color:"white",margin:"14px 0 4px",fontSize:26,fontWeight:900,letterSpacing:2}}>URBIES WORLD CUP</h1>
          <p style={{color:"#f97316",margin:"0 0 4px",fontSize:18,fontWeight:900,letterSpacing:3}}>2026</p>
          <p style={{color:"#7aadda",margin:0,fontSize:12,letterSpacing:3}}>URBANIC GROUP · INT'L CONSULTING</p>
        </div>
        <div style={{background:"rgba(255,255,255,0.06)",border:`1px solid ${BORDER}`,borderRadius:18,padding:28}}>
          <p style={{color:"#7aadda",fontSize:13,textAlign:"center",marginBottom:20,letterSpacing:1}}>INGRESA TUS DATOS</p>
          <div style={{marginBottom:14}}>
            <label style={{color:"#a8c8e8",fontSize:13,display:"block",marginBottom:7,fontWeight:600,letterSpacing:1}}>PARTICIPANTE</label>
            <select value={loginName} onChange={e=>setLoginName(e.target.value)} style={inp}>
              <option value="" style={{background:"#0d1b2e"}}>— Selecciona tu nombre —</option>
              {participants.map(p=><option key={p.name} value={p.name} style={{background:"#0d1b2e"}}>{p.name}</option>)}
            </select>
          </div>
          <div style={{marginBottom:20}}>
            <label style={{color:"#a8c8e8",fontSize:13,display:"block",marginBottom:7,fontWeight:600,letterSpacing:1}}>CONTRASEÑA</label>
            <input type="password" value={loginPass} onChange={e=>setLoginPass(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&login()} placeholder="Tu contraseña" style={inp}/>
          </div>
          {loginErr&&<p style={{color:"#f87171",fontSize:14,marginBottom:14,textAlign:"center",fontWeight:600}}>{loginErr}</p>}
          <button onClick={login} style={{width:"100%",padding:"14px",borderRadius:12,background:"linear-gradient(90deg,#1d6fb8,#f97316)",color:"white",fontWeight:900,fontSize:16,border:"none",cursor:"pointer",letterSpacing:2,boxShadow:"0 4px 20px rgba(249,115,22,0.3)"}}>
            🏆 INGRESAR
          </button>
        </div>
        <p style={{color:"#3a6080",fontSize:12,textAlign:"center",marginTop:18}}>Contraseña inicial: nombre en minúsculas + "123" · Ej: <span style={{color:"#5a9abf"}}>carlos123</span></p>
      </div>
    </div>
  );

  const scoreMap=getScoreMap();
  const myRank=scoreMap.findIndex(s=>s.name===user)+1;
  const myPts=scoreMap.find(s=>s.name===user)?.pts||0;

  return (
    <div style={{minHeight:"100vh",background:BG,color:"white",fontFamily:"system-ui,sans-serif"}}>
      {/* HEADER */}
      <div style={{background:BG2,borderBottom:`1px solid ${BORDER}`,padding:"10px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 12px rgba(0,0,0,0.4)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <UrbgLogoIcon size={36}/>
          <div>
            <div style={{fontWeight:900,fontSize:14,letterSpacing:1}}>URBIES WC <span style={{color:"#f97316"}}>2026</span></div>
            <div style={{fontSize:11,color:"#7aadda",marginTop:1}}>
              <span style={{color:"white",fontWeight:700}}>{user}</span> · #{myRank} · <span style={{color:"#f97316",fontWeight:800}}>{myPts} pts</span>
              &nbsp;{saving?"💾":""}
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:7,alignItems:"center"}}>
          {saved&&<div style={{background:"#22c55e",borderRadius:20,padding:"3px 12px",fontSize:12,fontWeight:800}}>✓ Guardado</div>}
          <button onClick={()=>setShowChangePass(true)} style={{background:"rgba(255,255,255,0.08)",border:`1px solid ${BORDER}`,color:"#a8c8e8",padding:"6px 11px",borderRadius:8,cursor:"pointer",fontSize:12}}>🔑</button>
          <button onClick={()=>setUser(null)} style={{background:"rgba(255,255,255,0.08)",border:`1px solid ${BORDER}`,color:"#a8c8e8",padding:"6px 11px",borderRadius:8,cursor:"pointer",fontSize:12}}>Salir</button>
        </div>
      </div>

      {/* MODAL CONTRASEÑA */}
      {showChangePass&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:BG2,border:`1px solid ${BORDER}`,borderRadius:18,padding:26,width:"100%",maxWidth:340}}>
            <h3 style={{margin:"0 0 18px",fontSize:17}}>🔑 Cambiar Contraseña</h3>
            <div style={{marginBottom:12}}>
              <label style={{color:"#a8c8e8",fontSize:13,display:"block",marginBottom:6,fontWeight:600}}>NUEVA CONTRASEÑA</label>
              <input type="password" value={newPass1} onChange={e=>setNewPass1(e.target.value)} placeholder="Mínimo 4 caracteres" style={inp}/>
            </div>
            <div style={{marginBottom:16}}>
              <label style={{color:"#a8c8e8",fontSize:13,display:"block",marginBottom:6,fontWeight:600}}>CONFIRMAR</label>
              <input type="password" value={newPass2} onChange={e=>setNewPass2(e.target.value)} placeholder="Repite la contraseña" style={inp}/>
            </div>
            {passMsg&&<p style={{color:passMsg.startsWith("✅")?"#22c55e":"#f87171",fontSize:14,margin:"0 0 14px",textAlign:"center",fontWeight:600}}>{passMsg}</p>}
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>{setShowChangePass(false);setNewPass1("");setNewPass2("");setPassMsg("");}}
                style={{flex:1,padding:"11px",borderRadius:10,background:"rgba(255,255,255,0.07)",color:"#a8c8e8",border:`1px solid ${BORDER}`,cursor:"pointer",fontSize:14}}>Cancelar</button>
              <button onClick={changePassword}
                style={{flex:1,padding:"11px",borderRadius:10,background:"linear-gradient(90deg,#1d6fb8,#f97316)",color:"white",border:"none",cursor:"pointer",fontWeight:800,fontSize:14}}>Guardar</button>
            </div>
          </div>
        </div>
      )}

      {/* NAV */}
      <div style={{display:"flex",borderBottom:`1px solid ${BORDER}`,background:BG2}}>
        {[["predicciones","⚽ Pronósticos"],["apuestas","👀 Apuestas"],["tabla","📊 Posiciones"],["grupos","👥 Grupos"],...(user===ADMIN?[["admin","⚙️ Admin"]]:[])]
        .map(([v,label])=>(
          <button key={v} onClick={()=>setView(v)}
            style={{flex:1,padding:"12px 4px",border:"none",background:"transparent",color:view===v?"#f97316":"#7aadda",fontWeight:view===v?900:500,fontSize:12,cursor:"pointer",borderBottom:view===v?"3px solid #f97316":"3px solid transparent"}}>
            {label}
          </button>
        ))}
      </div>

      <div style={{padding:14,maxWidth:700,margin:"0 auto"}}>
        {/* FILTRO */}
        {(view==="predicciones"||view==="apuestas"||view==="grupos")&&(
          <div style={{marginBottom:16}}>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:6}}>
              <button onClick={()=>setFilterGroup("ALL")} style={{padding:"6px 14px",borderRadius:20,border:"none",background:filterGroup==="ALL"?"#f97316":"rgba(255,255,255,0.08)",color:"white",cursor:"pointer",fontSize:12,fontWeight:700}}>Todos</button>
              {Object.keys(GROUPS).map(g=>(
                <button key={g} onClick={()=>setFilterGroup(g)}
                  style={{padding:"6px 12px",borderRadius:20,border:"none",background:filterGroup===g?GC[g]:"rgba(255,255,255,0.08)",color:"white",cursor:"pointer",fontSize:12,fontWeight:700}}>{g}</button>
              ))}
            </div>
            {["Octavos","Cuartos","Semifinal","3er Puesto","Final"].some(phase=>(appDb.extraMatches||[]).some(m=>m.phase===phase))&&(
              <div style={{display:"flex",gap:6,flexWrap:"wrap",paddingTop:6,borderTop:"1px solid rgba(255,255,255,0.08)"}}>
                <span style={{color:"#7aadda",fontSize:11,fontWeight:700,padding:"6px 4px",alignSelf:"center"}}>Eliminatorias:</span>
                {["Octavos","Cuartos","Semifinal","3er Puesto","Final"].filter(phase=>(appDb.extraMatches||[]).some(m=>m.phase===phase)).map(phase=>(
                  <button key={phase} onClick={()=>setFilterGroup(phase)}
                    style={{padding:"6px 12px",borderRadius:20,border:"1px solid rgba(29,111,184,0.4)",background:filterGroup===phase?"#1d6fb8":"rgba(29,111,184,0.15)",color:filterGroup===phase?"white":"#7aadda",cursor:"pointer",fontSize:12,fontWeight:700}}>
                    {phase==="Octavos"?"⚔️ Octavos":phase==="Cuartos"?"🏅 Cuartos":phase==="Semifinal"?"🔥 Semifinal":phase==="3er Puesto"?"🥉 3er Puesto":"🏆 Final"}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PRONÓSTICOS */}
        {view==="predicciones"&&filteredMatches.map(m=>{
          const pred=appDb.predictions[`${user}_${m.id}`]||{h:"",a:""};
          const real=appDb.results[m.id]||appDb.results[String(m.id)];
          const pts=pred.h!==""&&pred.a!==""&&real?calcPts(pred,real):null;
          const played=real&&real.h!=="";
          const locked=isLocked(m.id, m.date);
          const manualLocked=appDb.locked[m.id];
          return (
            <div key={m.id} style={{background:CARD,borderRadius:16,padding:"14px 16px",marginBottom:10,border:`1px solid ${locked?"rgba(255,255,255,0.08)":GC[m.g]+"40"}`,opacity:locked&&!pred.h?0.6:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:11,flexWrap:"wrap",gap:6}}>
                <span style={{background:m.phase?("#1d4ed8"):(GC[m.g]||"#64748b"),borderRadius:20,padding:"3px 12px",fontSize:11,fontWeight:800}}>{m.phase||`Grupo ${m.g}`}</span>
                <span style={{color:"#7aadda",fontSize:12,fontWeight:600}}>{m.date}</span>
                {locked&&!played&&<span style={{background:manualLocked?"#7c3aed":"#1e3a5f",borderRadius:20,padding:"3px 12px",fontSize:11,color:"#7aadda",fontWeight:700}}>{manualLocked?"🔒 Admin":"🔒 Fecha"}</span>}
                {pts!==null&&<span style={{background:pts===3?"#22c55e":pts===1?"#3b82f6":"#ef4444",borderRadius:20,padding:"3px 12px",fontSize:11,fontWeight:800}}>{pts===3?"⭐ 3 pts":pts===1?"✓ 1 pt":"✗ 0 pts"}</span>}
                {played&&pts===null&&<span style={{background:"#2a4a6e",borderRadius:20,padding:"3px 12px",fontSize:11,color:"#7aadda"}}>Jugado</span>}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{flex:1,textAlign:"right"}}>
                  <div style={{fontSize:28}}>{FLAG[m.h]||"🏳"}</div>
                  <div style={{fontSize:13,fontWeight:800,color:"white",marginTop:3}}>{m.h}</div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <input type="number" min="0" max="20" value={pred.h} disabled={locked}
                    onChange={e=>!locked&&savePrediction(m.id,e.target.value,pred.a)}
                    style={{...numInp,background:locked?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.1)",color:locked?"#445":"white",cursor:locked?"not-allowed":"text"}}/>
                  <span style={{color:"#4a7a9b",fontWeight:900,fontSize:18}}>–</span>
                  <input type="number" min="0" max="20" value={pred.a} disabled={locked}
                    onChange={e=>!locked&&savePrediction(m.id,pred.h,e.target.value)}
                    style={{...numInp,background:locked?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.1)",color:locked?"#445":"white",cursor:locked?"not-allowed":"text"}}/>
                </div>
                <div style={{flex:1,textAlign:"left"}}>
                  <div style={{fontSize:28}}>{FLAG[m.a]||"🏳"}</div>
                  <div style={{fontSize:13,fontWeight:800,color:"white",marginTop:3}}>{m.a}</div>
                </div>
              </div>
              {locked&&!played&&<div style={{textAlign:"center",marginTop:8,fontSize:12,color:manualLocked?"#a78bfa":"#4a7a9b"}}>{manualLocked?"🔒 El administrador cerró las apuestas para este partido":"🔒 Pronósticos cerrados para este partido"}</div>}
              {played&&<div style={{textAlign:"center",marginTop:10,fontSize:13,color:"#7aadda",fontWeight:600}}>Resultado real: <b style={{color:"#4ade80",fontSize:15}}>{real.h} – {real.a}</b></div>}
            </div>
          );
        })}

        {/* APUESTAS */}
        {view==="apuestas"&&(
          <div>
            <div style={{textAlign:"center",marginBottom:18}}>
              <div style={{fontSize:28}}>👀</div>
              <h2 style={{color:"white",fontWeight:900,fontSize:18,margin:"6px 0 2px"}}>APUESTAS URBIES</h2>
              <p style={{color:"#7aadda",fontSize:12,margin:0}}>Pronósticos de todos los participantes</p>
            </div>
            {filteredMatches.map(m=>{
              const real=appDb.results[m.id]||appDb.results[String(m.id)];
              const played=real&&real.h!=="";
              const anyPred=participants.some(p=>appDb.predictions[`${p.name}_${m.id}`]?.h!=="");
              if(!anyPred) return null;
              return (
                <div key={m.id} style={{background:CARD,borderRadius:16,padding:"14px 16px",marginBottom:12,border:`1px solid ${GC[m.g]}40`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:6}}>
                    <span style={{background:m.phase?("#1d4ed8"):(GC[m.g]||"#64748b"),borderRadius:20,padding:"3px 12px",fontSize:11,fontWeight:800}}>{m.phase||`Grupo ${m.g}`}</span>
                    <span style={{color:"white",fontWeight:800,fontSize:13}}>{FLAG[m.h]} {m.h} vs {m.a} {FLAG[m.a]}</span>
                    <span style={{color:"#7aadda",fontSize:11}}>{m.date}</span>
                  </div>
                  {played&&(
                    <div style={{textAlign:"center",marginBottom:10,padding:"6px",background:"rgba(74,222,128,0.1)",borderRadius:10,border:"1px solid rgba(74,222,128,0.2)"}}>
                      <span style={{color:"#4ade80",fontWeight:900,fontSize:14}}>Resultado final: {real.h} – {real.a}</span>
                    </div>
                  )}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                    {participants.map(p=>{
                      const pred=appDb.predictions[`${p.name}_${m.id}`];
                      if(!pred||pred.h==="") return (
                        <div key={p.name} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(255,255,255,0.03)",borderRadius:10,padding:"8px 12px",opacity:0.4}}>
                          <span style={{fontSize:12,fontWeight:700,color:"#7aadda"}}>{p.name}</span>
                          <span style={{fontSize:11,color:"#445"}}>sin pronóstico</span>
                        </div>
                      );
                      const pts=played?calcPts(pred,real):null;
                      const bg=pts===3?"rgba(74,222,128,0.12)":pts===1?"rgba(96,165,250,0.12)":pts===0?"rgba(248,113,113,0.1)":"rgba(255,255,255,0.04)";
                      const border=pts===3?"rgba(74,222,128,0.3)":pts===1?"rgba(96,165,250,0.3)":pts===0?"rgba(248,113,113,0.2)":`rgba(255,255,255,0.08)`;
                      return (
                        <div key={p.name} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:bg,borderRadius:10,padding:"8px 12px",border:`1px solid ${border}`}}>
                          <span style={{fontSize:12,fontWeight:800,color:p.name===user?"#f97316":"white"}}>{p.name}</span>
                          <span style={{fontSize:16,fontWeight:900,color:"white"}}>{pred.h} – {pred.a}</span>
                          {pts!==null&&<span style={{fontSize:11,fontWeight:800,color:pts===3?"#4ade80":pts===1?"#60a5fa":"#f87171"}}>{pts===3?"⭐3":pts===1?"✓1":"✗0"}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <p style={{color:"#3a6080",fontSize:11,textAlign:"center",marginTop:8}}>Solo se muestran partidos con al menos un pronóstico registrado</p>
          </div>
        )}

        {/* TABLA */}
        {view==="tabla"&&(
          <div>
            <div style={{textAlign:"center",marginBottom:24}}>
              <UrbgLogoFull width={280}/>
              <p style={{color:"#7aadda",fontSize:13,marginTop:12,letterSpacing:3,fontWeight:600}}>TABLA DE POSICIONES</p>
            </div>
            <div style={{background:"rgba(255,255,255,0.07)",border:`1px solid ${BORDER}`,borderRadius:14,padding:"14px 16px",marginBottom:18,display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:10}}>
              <div style={{textAlign:"center"}}><div style={{fontSize:24}}>⭐</div><div style={{color:"#4ade80",fontWeight:900,fontSize:20}}>3 pts</div><div style={{color:"#a8c8e8",fontSize:12,fontWeight:600}}>Marcador exacto</div></div>
              <div style={{textAlign:"center"}}><div style={{fontSize:24}}>✓</div><div style={{color:"#60a5fa",fontWeight:900,fontSize:20}}>1 pt</div><div style={{color:"#a8c8e8",fontSize:12,fontWeight:600}}>Resultado</div></div>
              <div style={{textAlign:"center"}}><div style={{fontSize:24}}>✗</div><div style={{color:"#f87171",fontWeight:900,fontSize:20}}>0 pts</div><div style={{color:"#a8c8e8",fontSize:12,fontWeight:600}}>Fallo</div></div>
            </div>
            {scoreMap.map((s,i)=>(
              <div key={s.name} style={{background:s.name===user?"rgba(249,115,22,0.15)":CARD,borderRadius:16,padding:"16px 20px",marginBottom:10,display:"flex",alignItems:"center",gap:14,border:s.name===user?"1px solid rgba(249,115,22,0.5)":`1px solid ${BORDER}`}}>
                <div style={{fontSize:30,minWidth:40,textAlign:"center"}}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":<span style={{color:"#4a7a9b",fontSize:18,fontWeight:800}}>#{i+1}</span>}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:900,fontSize:17}}>{s.name} {s.name===user&&<span style={{color:"#f97316",fontSize:13}}>(tú)</span>}</div>
                  <div style={{fontSize:13,marginTop:4}}>
                    <span style={{color:"#4ade80"}}>⭐ {[...MATCHES_RAW,...(appDb.extraMatches||[])].filter(m=>{const p=appDb.predictions[`${s.name}_${m.id}`],r=appDb.results[m.id]||appDb.results[String(m.id)];return p&&r&&calcPts(p,r)===3;}).length} exactos</span>
                    {" · "}
                    <span style={{color:"#60a5fa"}}>✓ {[...MATCHES_RAW,...(appDb.extraMatches||[])].filter(m=>{const p=appDb.predictions[`${s.name}_${m.id}`],r=appDb.results[m.id]||appDb.results[String(m.id)];return p&&r&&calcPts(p,r)===1;}).length} resultado</span>
                  </div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:32,fontWeight:900,color:i===0?"#fbbf24":i===1?"#d1d5db":i===2?"#d97706":"white"}}>{s.pts}</div>
                  <div style={{fontSize:12,color:"#7aadda",fontWeight:700}}>puntos</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* GRUPOS */}
        {view==="grupos"&&(
          <div>
            {(filterGroup==="ALL"||["Octavos","Cuartos","Semifinal","3er Puesto","Final"].includes(filterGroup))&&(appDb.extraMatches||[]).filter(m=>filterGroup==="ALL"||m.phase===filterGroup).length>0&&(
              <div style={{background:CARD,borderRadius:16,padding:16,marginBottom:14,border:"1px solid rgba(29,111,184,0.4)"}}>
                <div style={{marginBottom:12}}><span style={{background:"#1d6fb8",borderRadius:20,padding:"4px 14px",fontSize:12,fontWeight:800}}>⚔️ FASE ELIMINATORIA</span></div>
                <div style={{borderTop:`1px solid ${BORDER}`,paddingTop:10}}>
                  {(appDb.extraMatches||[]).filter(m=>filterGroup==="ALL"||m.phase===filterGroup).map(m=>{
                    const real=appDb.results[m.id]||appDb.results[String(m.id)];
                    return (
                      <div key={m.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid rgba(255,255,255,0.05)`}}>
                        <span style={{fontSize:11,color:"#60a5fa",minWidth:70,fontWeight:700}}>{m.phase} · {m.date}</span>
                        <span style={{fontSize:13,flex:1,textAlign:"right",fontWeight:700,color:"white"}}>{FLAG[m.h]||"🏳"} {m.h}</span>
                        <span style={{fontSize:13,fontWeight:900,minWidth:60,textAlign:"center",color:real&&real.h!==""?"#4ade80":"#3a6080"}}>{real&&real.h!==""?`${real.h}–${real.a}`:"vs"}</span>
                        <span style={{fontSize:13,flex:1,fontWeight:700,color:"white"}}>{m.a} {FLAG[m.a]||"🏳"}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {Object.entries(GROUPS).filter(([g])=>filterGroup==="ALL"||g===filterGroup).map(([g,teams])=>(
              <div key={g} style={{background:CARD,borderRadius:16,padding:16,marginBottom:14,border:`1px solid ${GC[g]}40`}}>
                <div style={{marginBottom:12}}><span style={{background:GC[g],borderRadius:20,padding:"4px 14px",fontSize:12,fontWeight:800}}>GRUPO {g}</span></div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
                  {teams.map(t=>(
                    <div key={t} style={{display:"flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.05)",borderRadius:10,padding:"10px 12px"}}>
                      <span style={{fontSize:22}}>{FLAG[t]||"🏳"}</span>
                      <span style={{fontSize:13,fontWeight:700,color:"white"}}>{t}</span>
                    </div>
                  ))}
                </div>
                <div style={{borderTop:`1px solid ${BORDER}`,paddingTop:10}}>
                  {MATCHES_RAW.filter(m=>m.g===g).map(m=>{
                    const real=appDb.results[m.id]||appDb.results[String(m.id)];
                    return (
                      <div key={m.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid rgba(255,255,255,0.05)`}}>
                        <span style={{fontSize:12,color:"#7aadda",minWidth:52,fontWeight:600}}>{m.date}</span>
                        <span style={{fontSize:13,flex:1,textAlign:"right",fontWeight:700,color:"white"}}>{FLAG[m.h]} {m.h}</span>
                        <span style={{fontSize:13,fontWeight:900,minWidth:60,textAlign:"center",color:real&&real.h!==""?"#4ade80":"#3a6080"}}>{real&&real.h!==""?`${real.h}–${real.a}`:"vs"}</span>
                        <span style={{fontSize:13,flex:1,fontWeight:700,color:"white"}}>{m.a} {FLAG[m.a]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ADMIN */}
        {view==="admin"&&user===ADMIN&&(
          <div>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:32}}>⚙️</div>
              <h2 style={{color:"white",fontWeight:900,fontSize:18,margin:"6px 0 2px"}}>PANEL ADMINISTRADOR</h2>
              <p style={{color:"#7aadda",fontSize:12,margin:0}}>Solo visible para Mónica</p>
            </div>

            {/* ── AGREGAR PARTIDOS ELIMINATORIAS ── */}
            <div style={{background:CARD,borderRadius:16,padding:18,marginBottom:16,border:"1px solid rgba(29,111,184,0.4)"}}>
              <h3 style={{color:"#60a5fa",fontSize:15,fontWeight:800,margin:"0 0 6px",letterSpacing:1}}>➕ AGREGAR PARTIDO (FASES ELIMINATORIAS)</h3>
              <p style={{color:"#7aadda",fontSize:12,margin:"0 0 14px"}}>Agrega los partidos de Octavos, Cuartos, Semifinal y Final cuando se conozcan los clasificados.</p>
              {matchMsg&&<div style={{background:matchMsg.startsWith("✅")?"rgba(74,222,128,0.15)":"rgba(248,113,113,0.15)",border:`1px solid ${matchMsg.startsWith("✅")?"rgba(74,222,128,0.4)":"rgba(248,113,113,0.4)"}`,borderRadius:10,padding:"10px",marginBottom:12,textAlign:"center",color:matchMsg.startsWith("✅")?"#4ade80":"#f87171",fontWeight:700}}>{matchMsg}</div>}
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10}}>
                <select value={newMatchPhase} onChange={e=>setNewMatchPhase(e.target.value)}
                  style={{padding:"9px 12px",borderRadius:9,border:`1px solid ${BORDER}`,background:"rgba(255,255,255,0.08)",color:"white",fontSize:14,outline:"none"}}>
                  <option value="Octavos">Octavos de final</option>
                  <option value="Cuartos">Cuartos de final</option>
                  <option value="Semifinal">Semifinal</option>
                  <option value="Final">Final</option>
                  <option value="3er Puesto">3er Puesto</option>
                </select>
                <input value={newMatchDate} onChange={e=>setNewMatchDate(e.target.value)} placeholder="Fecha (ej: 1 Jul)"
                  style={{width:110,padding:"9px 12px",borderRadius:9,border:`1px solid ${BORDER}`,background:"rgba(255,255,255,0.08)",color:"white",fontSize:14,outline:"none"}}/>
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
                <input value={newMatchH} onChange={e=>setNewMatchH(e.target.value)} placeholder="🏠 Equipo local"
                  style={{flex:1,minWidth:120,padding:"9px 12px",borderRadius:9,border:`1px solid ${BORDER}`,background:"rgba(255,255,255,0.08)",color:"white",fontSize:14,outline:"none"}}/>
                <span style={{color:"#7aadda",fontWeight:900}}>vs</span>
                <input value={newMatchA} onChange={e=>setNewMatchA(e.target.value)} placeholder="✈️ Equipo visitante"
                  style={{flex:1,minWidth:120,padding:"9px 12px",borderRadius:9,border:`1px solid ${BORDER}`,background:"rgba(255,255,255,0.08)",color:"white",fontSize:14,outline:"none"}}/>
                <button onClick={addExtraMatch}
                  style={{padding:"9px 18px",borderRadius:9,background:"linear-gradient(90deg,#1d6fb8,#f97316)",color:"white",border:"none",cursor:"pointer",fontWeight:800,fontSize:14}}>
                  Agregar
                </button>
              </div>
              {(appDb.extraMatches||[]).length>0&&(
                <div style={{marginTop:14}}>
                  <p style={{color:"#7aadda",fontSize:12,fontWeight:700,margin:"0 0 8px"}}>PARTIDOS AGREGADOS:</p>
                  {(appDb.extraMatches||[]).map(m=>(
                    <div key={m.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(29,111,184,0.15)",borderRadius:10,padding:"8px 12px",marginBottom:6,border:"1px solid rgba(29,111,184,0.3)"}}>
                      <span style={{fontSize:13,color:"white",fontWeight:700}}>
                        <span style={{background:"#1d6fb8",borderRadius:12,padding:"2px 8px",fontSize:10,marginRight:8}}>{m.phase}</span>
                        {m.h} vs {m.a} · {m.date}
                      </span>
                      <button onClick={()=>deleteExtraMatch(m.id)}
                        style={{padding:"4px 10px",borderRadius:8,background:"rgba(239,68,68,0.2)",color:"#f87171",border:"1px solid rgba(239,68,68,0.3)",cursor:"pointer",fontSize:12}}>🗑️</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── SECCIÓN RESULTADOS ── */}
            <div style={{background:CARD,borderRadius:16,padding:18,marginBottom:16,border:"1px solid rgba(74,222,128,0.3)"}}>
              <h3 style={{color:"#4ade80",fontSize:15,fontWeight:800,margin:"0 0 6px",letterSpacing:1}}>⚽ CARGAR RESULTADOS</h3>
              <p style={{color:"#7aadda",fontSize:12,margin:"0 0 14px"}}>Ingresa el marcador final de cada partido jugado.</p>

              {resMsg&&<div style={{background:resMsg.startsWith("✅")?"rgba(74,222,128,0.15)":"rgba(248,113,113,0.15)",border:`1px solid ${resMsg.startsWith("✅")?"rgba(74,222,128,0.4)":"rgba(248,113,113,0.4)"}`,borderRadius:10,padding:"10px 16px",marginBottom:14,textAlign:"center",color:resMsg.startsWith("✅")?"#4ade80":"#f87171",fontWeight:700}}>{resMsg}</div>}

              {/* Filtro grupos + fases */}
              <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>
                <button onClick={()=>setResFilterGroup("ALL")} style={{padding:"5px 12px",borderRadius:20,border:"none",background:resFilterGroup==="ALL"?"#4ade80":"rgba(255,255,255,0.08)",color:resFilterGroup==="ALL"?"#000":"white",cursor:"pointer",fontSize:11,fontWeight:700}}>Todos</button>
                {Object.keys(GROUPS).map(g=>(
                  <button key={g} onClick={()=>setResFilterGroup(g)}
                    style={{padding:"5px 10px",borderRadius:20,border:"none",background:resFilterGroup===g?GC[g]:"rgba(255,255,255,0.08)",color:"white",cursor:"pointer",fontSize:11,fontWeight:700}}>{g}</button>
                ))}
                {["Octavos","Cuartos","Semifinal","3er Puesto","Final"].filter(phase=>(appDb.extraMatches||[]).some(m=>m.phase===phase)).map(phase=>(
                  <button key={phase} onClick={()=>setResFilterGroup(phase)}
                    style={{padding:"5px 10px",borderRadius:20,border:"none",background:resFilterGroup===phase?"#1d6fb8":"rgba(255,255,255,0.08)",color:"white",cursor:"pointer",fontSize:11,fontWeight:700}}>{phase}</button>
                ))}
              </div>

              {resFilteredMatches.map(m=>{
                const real=appDb.results[m.id]||appDb.results[String(m.id)];
                const edit=editResults[m.id]||{h:"",a:""};
                const hasResult=real&&real.h!=="";
                return (
                  <div key={m.id} style={{background:"rgba(255,255,255,0.04)",borderRadius:12,padding:"12px 14px",marginBottom:8,border:`1px solid ${hasResult?"rgba(74,222,128,0.25)":GC[m.g]+"30"}`}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,flex:1,minWidth:180}}>
                        <span style={{background:GC[m.g],borderRadius:12,padding:"2px 8px",fontSize:10,fontWeight:800}}>{m.g}</span>
                        <span style={{fontSize:13,fontWeight:700,color:"white"}}>{FLAG[m.h]} {m.h} <span style={{color:"#4a7a9b"}}>vs</span> {m.a} {FLAG[m.a]}</span>
                        <span style={{fontSize:11,color:"#7aadda"}}>{m.date}</span>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        {hasResult&&!editResults[m.id]&&(
                          <span style={{color:"#4ade80",fontWeight:900,fontSize:16,minWidth:60,textAlign:"center"}}>{real.h} – {real.a}</span>
                        )}
                        <input type="number" min="0" max="20" placeholder={hasResult?real.h:"L"} value={edit.h}
                          onChange={e=>handleResChange(m.id,"h",e.target.value)}
                          style={{width:44,textAlign:"center",padding:"7px 2px",borderRadius:8,border:`1px solid ${BORDER}`,background:"rgba(255,255,255,0.1)",color:"white",fontSize:18,fontWeight:900,outline:"none"}}/>
                        <span style={{color:"#4a7a9b",fontWeight:900}}>–</span>
                        <input type="number" min="0" max="20" placeholder={hasResult?real.a:"V"} value={edit.a}
                          onChange={e=>handleResChange(m.id,"a",e.target.value)}
                          style={{width:44,textAlign:"center",padding:"7px 2px",borderRadius:8,border:`1px solid ${BORDER}`,background:"rgba(255,255,255,0.1)",color:"white",fontSize:18,fontWeight:900,outline:"none"}}/>
                        <button onClick={()=>saveResult(m.id)}
                          style={{padding:"7px 14px",borderRadius:8,background:"linear-gradient(90deg,#22c55e,#16a34a)",color:"white",border:"none",cursor:"pointer",fontWeight:800,fontSize:13}}>
                          {hasResult?"✏️":"✅"}
                        </button>
                        <button onClick={()=>toggleLock(m.id)}
                          title={appDb.locked[m.id]?"Abrir apuestas":"Cerrar apuestas"}
                          style={{padding:"7px 12px",borderRadius:8,background:appDb.locked[m.id]?"rgba(124,58,237,0.3)":"rgba(255,255,255,0.08)",color:appDb.locked[m.id]?"#a78bfa":"#7aadda",border:`1px solid ${appDb.locked[m.id]?"rgba(124,58,237,0.5)":"rgba(255,255,255,0.12)"}`,cursor:"pointer",fontSize:13,fontWeight:700}}>
                          {appDb.locked[m.id]?"🔒":"🔓"}
                        </button>
                        {hasResult&&<button onClick={()=>clearResult(m.id)}
                          style={{padding:"7px 10px",borderRadius:8,background:"rgba(239,68,68,0.2)",color:"#f87171",border:"1px solid rgba(239,68,68,0.3)",cursor:"pointer",fontSize:13}}>🗑️</button>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── SECCIÓN PARTICIPANTES ── */}
            {adminMsg&&<div style={{background:adminMsg.startsWith("✅")?"rgba(74,222,128,0.15)":"rgba(248,113,113,0.15)",border:`1px solid ${adminMsg.startsWith("✅")?"rgba(74,222,128,0.4)":"rgba(248,113,113,0.4)"}`,borderRadius:10,padding:"10px 16px",marginBottom:16,textAlign:"center",color:adminMsg.startsWith("✅")?"#4ade80":"#f87171",fontWeight:700}}>{adminMsg}</div>}
            <div style={{background:CARD,borderRadius:16,padding:18,marginBottom:16,border:`1px solid ${BORDER}`}}>
              <h3 style={{color:"#f97316",fontSize:14,fontWeight:800,margin:"0 0 14px",letterSpacing:1}}>➕ AGREGAR PARTICIPANTE</h3>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <input value={adminNewName} onChange={e=>setAdminNewName(e.target.value)} placeholder="Nombre (ej: PEDRO)"
                  style={{flex:1,minWidth:120,padding:"9px 12px",borderRadius:9,border:`1px solid ${BORDER}`,background:"rgba(255,255,255,0.08)",color:"white",fontSize:14,outline:"none"}}/>
                <input value={adminNewPass} onChange={e=>setAdminNewPass(e.target.value)} placeholder="Contraseña"
                  style={{flex:1,minWidth:120,padding:"9px 12px",borderRadius:9,border:`1px solid ${BORDER}`,background:"rgba(255,255,255,0.08)",color:"white",fontSize:14,outline:"none"}}/>
                <button onClick={adminAddParticipant}
                  style={{padding:"9px 18px",borderRadius:9,background:"linear-gradient(90deg,#1d6fb8,#f97316)",color:"white",border:"none",cursor:"pointer",fontWeight:800,fontSize:14}}>Agregar</button>
              </div>
            </div>
            <div style={{background:CARD,borderRadius:16,padding:18,border:`1px solid ${BORDER}`}}>
              <h3 style={{color:"#f97316",fontSize:14,fontWeight:800,margin:"0 0 14px",letterSpacing:1}}>👥 PARTICIPANTES ({participants.length})</h3>
              {participants.map((p,i)=>(
                <div key={p.name} style={{marginBottom:8}}>
                  {adminEditIdx===i ? (
                    <div style={{display:"flex",gap:8,flexWrap:"wrap",background:"rgba(249,115,22,0.1)",borderRadius:10,padding:10,border:"1px solid rgba(249,115,22,0.3)"}}>
                      <input value={adminEditName} onChange={e=>setAdminEditName(e.target.value)}
                        style={{flex:1,minWidth:100,padding:"8px 10px",borderRadius:8,border:`1px solid ${BORDER}`,background:"rgba(255,255,255,0.08)",color:"white",fontSize:14,outline:"none"}}/>
                      <input value={adminEditPass} onChange={e=>setAdminEditPass(e.target.value)}
                        style={{flex:1,minWidth:100,padding:"8px 10px",borderRadius:8,border:`1px solid ${BORDER}`,background:"rgba(255,255,255,0.08)",color:"white",fontSize:14,outline:"none"}}/>
                      <button onClick={adminSaveEdit} style={{padding:"8px 14px",borderRadius:8,background:"#22c55e",color:"white",border:"none",cursor:"pointer",fontWeight:800,fontSize:13}}>✓</button>
                      <button onClick={()=>setAdminEditIdx(null)} style={{padding:"8px 14px",borderRadius:8,background:"rgba(255,255,255,0.08)",color:"#aaa",border:`1px solid ${BORDER}`,cursor:"pointer",fontSize:13}}>✕</button>
                    </div>
                  ) : (
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"10px 14px",border:`1px solid ${BORDER}`}}>
                      <div>
                        <span style={{fontWeight:800,fontSize:14,color:p.name===ADMIN?"#f97316":"white"}}>{p.name}</span>
                        {p.name===ADMIN&&<span style={{fontSize:11,color:"#f97316",marginLeft:6}}>(admin)</span>}
                        <div style={{fontSize:11,color:"#4a7a9b",marginTop:2}}>Pass: {p.pass}</div>
                      </div>
                      <div style={{display:"flex",gap:8}}>
                        <button onClick={()=>adminStartEdit(i)} style={{padding:"6px 12px",borderRadius:8,background:"rgba(59,130,246,0.2)",color:"#60a5fa",border:"1px solid rgba(59,130,246,0.3)",cursor:"pointer",fontSize:12,fontWeight:700}}>✏️</button>
                        {p.name!==ADMIN&&<button onClick={()=>adminDeleteParticipant(p.name)} style={{padding:"6px 12px",borderRadius:8,background:"rgba(239,68,68,0.2)",color:"#f87171",border:"1px solid rgba(239,68,68,0.3)",cursor:"pointer",fontSize:12,fontWeight:700}}>🗑️</button>}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
