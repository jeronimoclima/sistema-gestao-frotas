import { useEffect, useState } from "react";
import type { Motorista } from "../../types";
import { MotoristasService } from "../../services/motoristas.service";
import { MotoristaForm } from "./MotoristaForm";
import { MotoristaList } from "./MotoristaList";
import "./motorista.css";

export function MotoristaPage() {
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [mostrarForm, setMostrarForm] = useState(false);


  function carregar() {
  MotoristasService.listar().then(setMotoristas);
}



  useEffect(() => {
    carregar();
  }, []);

  return (
  <div className="page">
    {mostrarForm ? (
      <MotoristaForm
        onSave={() => {
          carregar();
          setMostrarForm(false);
        }}
        onCancel={() => setMostrarForm(false)}
      />
    ) : (
      <MotoristaList
        motoristas={motoristas}
        onDelete={carregar}
        onNovoMotorista={() => setMostrarForm(true)}
      />
    )}
  </div>
);

}
