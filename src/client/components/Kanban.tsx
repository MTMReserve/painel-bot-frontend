// ============================ 
// File: src/client/components/Kanban.tsx
// ============================

import { useClients } from "@client/hooks/useClients";
import { useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { useClientFilters } from "@client/store/useClientFilters";
import { StatusChip } from "@client/components/StatusChip";
import { Link } from "react-router-dom";

export function Kanban() {
  const { etapa, status, produtoId } = useClientFilters();

  const {
  data: clients,
  isLoading,
  isError,
  refetch,
} = useClients();

  useEffect(() => {
    refetch();
  }, [etapa, status, produtoId, refetch]); // ✅ Corrigido aqui

  const etapas = [
    "entrada",
    "abordagem",
    "levantamento",
    "proposta",
    "negociacao",
    "objecoes",
    "fechamento",
    "encerramento",
    "pos_venda",
    "reativacao",
  ];

  const onDragEnd = (result: DropResult) => {
    console.log("Movido:", result);
    // 🔜 Futuro: enviar update para o backend
  };

  if (isLoading) return <p>Carregando clientes...</p>;
  if (isError) return <p>Erro ao carregar clientes</p>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-5 gap-4">
        {etapas.map((etapa) => (
          <Droppable key={etapa} droppableId={etapa}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-100 p-2 rounded shadow min-h-[200px]"
              >
                <h2 className="font-bold text-sm mb-2 uppercase">{etapa}</h2>
                <ul className="space-y-2">
                  {clients
                    ?.filter((c) => c.current_state === etapa)
                    .map((client, index) => (
                      <Draggable
                        key={client.id.toString()}
                        draggableId={client.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <Link to={`/clientes/${client.id}`} key={client.id}>
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white border p-2 rounded shadow-sm text-sm hover:bg-gray-50"
                            >
                              <strong>{client.name || "Sem nome"}</strong>
                              <br />
                              <span className="text-xs text-gray-500">
                                {client.phone}
                              </span>
                              <div className="mt-1 flex gap-1">
                                {client.status && (
                                  <StatusChip
                                    label={client.status}
                                    variant="status"
                                  />
                                )}
                                {client.temperatura && (
                                  <StatusChip
                                    label={client.temperatura}
                                    variant="temperatura"
                                  />
                                )}
                              </div>
                            </li>
                          </Link>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </ul>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
