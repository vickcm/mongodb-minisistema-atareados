import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
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
  const [desafioVersion, setDesafioVersion] = useState(0);

  const params = useParams();

  const fetchDesafio = useCallback(async () => {
    const idDesafio = params.idDesafio;
    if (idDesafio) {
      try {
        const fetchedDesafio = await desafioService.getChallengeById(idDesafio);
        setDesafio(fetchedDesafio);
        setDesafioVersion((prevVersion) => prevVersion + 1);
      } catch (error) {
        console.log("Error al obtener el desafío:", error);
      }
    }
  }, [params.idDesafio]);

  useEffect(() => {
    fetchDesafio();
  }, [fetchDesafio, params.idDesafio]);

  const updateTareas = useCallback((nuevasTareas) => {
    setTareas(nuevasTareas);
  }, []);

  const desafioValue = useMemo(
    () => ({ desafio }),
    [desafio]
  );
  const setDesafioValue = useCallback((nuevoDesafio) => {
    setDesafio(nuevoDesafio);
  }, []);

  return (
    <DesafioContext.Provider value={desafioValue}>
      <SetDesafioContext.Provider value={setDesafioValue}>
        <TareasContext.Provider value={tareas}>
          <UpdateTareasContext.Provider value={updateTareas}>
            {children}
          </UpdateTareasContext.Provider>
        </TareasContext.Provider>
      </SetDesafioContext.Provider>
    </DesafioContext.Provider>
  );
}

export {
  DesafioContext,
  SetDesafioContext,
  useDesafio,
  useSetDesafio,
  TareasContext,
  UpdateTareasContext,
  useTareas,
  useUpdateTareas,
};
