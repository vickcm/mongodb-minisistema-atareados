import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import desafioService from "../service/desafio.service.js";

const DesafioContext = createContext();

function useDesafio() {
  return useContext(DesafioContext);
}

export function DesafioProvider({ children }) {
  const [desafio, setDesafio] = useState({});
  const params = useParams();
  console.log("params", params);

  const fetchDesafio = useCallback(async () => {
    const idDesafio = params.idDesafio;
    console.log("idDesafio", idDesafio);
    if (idDesafio) {
      console.log("Ejecutando getChallengeById en el DesafioProvider");
      const fetchedDesafio = await desafioService.getChallengeById(idDesafio);
      setDesafio(fetchedDesafio);
      console.log("fetchedDesafio", fetchedDesafio);
    }
  }, [params.idDesafio]);

  useEffect(() => {
    fetchDesafio();
  }, [fetchDesafio]);

  const desafioValue = useMemo(() => desafio, [desafio]);

  return (
    <DesafioContext.Provider value={desafioValue}>
      {children}
    </DesafioContext.Provider>
  );
}

export { DesafioContext, useDesafio };
