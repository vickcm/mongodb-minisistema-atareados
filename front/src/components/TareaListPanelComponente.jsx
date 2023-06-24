import React from 'react';
import TareaItemList from "./TareaItemListComponente";
import '../css/TareaPanelComponente.css';

function TareaPanelComponente({ tarea }) {
  return (
    <TareaItemList tarea={tarea} />
  );
}

export default TareaPanelComponente;