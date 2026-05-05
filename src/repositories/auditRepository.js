const supabase = require("../config/supabase");

const createLog = async ({
  usuario_id,
  accion,
  modulo,
  registro_id,
  descripcion,
  ip = null
}) => {
  const { data, error } = await supabase
    .from("bitacora_auditoria")
    .insert([
      {
        usuario_id,
        accion,
        modulo,
        registro_id,
        descripcion,
        ip
      }
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creando log de auditoría:", error.message);
    throw new Error("No se pudo registrar la acción en la bitácora");
  }

  return data;
};

module.exports = {
  createLog
};