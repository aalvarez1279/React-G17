import { lazy } from "react";
import { Route, Routes } from "react-router-dom"
import { useProductos } from "./aplicacion/useProductos";
import { Home } from "./ui/pages/Home"
import Layout from "./ui/layout/Layout"
import NoEncontrada from "./ui/pages/NoEncontrada"
import RutaProtegida from "./ui/components/RutaProtegida";

const Detalle = lazy(() => import('./ui/pages/Detalle'));
const Checkout = lazy(() => import('./ui/pages/Checkout'));
const Login = lazy(() => import('./ui/pages/Login'));
const Registro = lazy(() => import('./ui/pages/Registro'));

export default function App() {
  const { productos, estado, esRespaldo, reintentar } = useProductos();

  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={
          <Home esRespaldo={esRespaldo} onReintentar={reintentar} productos={productos} estado={estado}/>
        }/>
        <Route path="/producto/:id" element={<Detalle productos={productos} estado={estado}/>}/>
        <Route element={<RutaProtegida/>}>
          <Route path="/checkout" element={<Checkout/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/registro" element={<Registro/>}/>
      </Route>
      <Route path="*" element={<NoEncontrada/>}/>
    </Routes>
  )
}