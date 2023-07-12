import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import desafioService from "../service/desafio.service.js";

const DesafioContext = createContext();
const SetDesafioContext = createContext();

function useDesafio() {
  return useContext(DesafioContext);
}

function useSetDesafio() {
  return useContext(SetDesafioContext);
}

export function DesafioProvider({ children }) {
  const [desafio, setDesafio] = useState({});
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
  }, [desafio]);

  const desafioValue = useMemo(() => desafio, [desafio]);

  return (
    <DesafioContext.Provider value={desafioValue}>
      <SetDesafioContext.Provider value={setDesafio}>
        {children}
      </SetDesafioContext.Provider>
    </DesafioContext.Provider>
  );
}

export { DesafioContext, SetDesafioContext, useDesafio, useSetDesafio };
