import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import desafioService from "../service/desafio.service.js";

const DesafioContext = createContext();
const SetDesafioContext = createContext();

function useDesafio() {
  console.log("Ejecutando useDesafio");
  return useContext(DesafioContext);
}

function useSetDesafio() {
  return useContext(SetDesafioContext);
}

const TareasContext = createContext();
const UpdateTareasContext = createContext();
function useTareas() {
  return useContext(TareasContext);
}

function useUpdateTareas() {
  return useContext(UpdateTareasContext);
}


export function DesafioProvider({ children }) {
  const [desafio, setDesafio] = useState({});
  
  const [tareas, setTareas] = useState([]);

  const params = useParams();

  const fetchDesafio = useCallback(async () => {
    const idDesafio = params.idDesafio;
    if (idDesafio) {
      console.log("Ejecutando getChallengeById en el DesafioProvider");
      const fetchedDesafio = await desafioService.getChallengeById(idDesafio);
      setDesafio(fetchedDesafio);
    }
  }, [params.idDesafio]);

  useEffect(() => {
    fetchDesafio();
  }, [fetchDesafio, params.idDesafio]);

  const updateTareas = useCallback((nuevasTareas) => {
    setTareas(nuevasTareas);
  }, []);

  

  const desafioValue = useMemo(() => desafio, [desafio]);

  return (
    <DesafioContext.Provider value={desafioValue}>
      <SetDesafioContext.Provider value={setDesafio}>
      <TareasContext.Provider value={tareas}>
          <UpdateTareasContext.Provider value={updateTareas}>
            {children}
          </UpdateTareasContext.Provider>
        </TareasContext.Provider>
      
      </SetDesafioContext.Provider>
    </DesafioContext.Provider>
  );
}

export { DesafioContext, SetDesafioContext, useDesafio, useSetDesafio, TareasContext, UpdateTareasContext, useTareas, useUpdateTareas };
