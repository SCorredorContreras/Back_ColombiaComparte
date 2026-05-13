const supabase = require('../config/supabase');

const findUserByUsername = async (username) => {
  const { data, error } = await supabase
    .from('usuarios')
    .select(`
      id,
      nombre,
      apellido,
      email,
      username,
      password_hash,
      estado,
      pais_id,
      roles (
        id,
        nombre
      ),
      paises (
        id,
        nombre,
        codigo,
        slug
      )
    `)
    .eq('username', username)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const updateLastAccess = async (userId) => {
  const { error } = await supabase
    .from('usuarios')
    .update({ ultimo_acceso: new Date().toISOString() })
    .eq('id', userId);

  if (error) {
    throw new Error(error.message);
  }
};

const findUserByIdentifier = async (identifier) => {
  const { data, error } = await supabase
    .from('usuarios')
    .select(`
      id,
      nombre,
      apellido,
      email,
      username,
      password_hash,
      pregunta_seguridad,
      respuesta_seguridad_hash,
      estado,
      pais_id,
      roles (
        id,
        nombre
      ),
      paises (
        id,
        nombre,
        codigo,
        slug
      )
    `)
    .or(`username.eq.${identifier},email.eq.${identifier}`)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const findUserById = async (id) => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const updatePassword = async (userId, password_hash) => {
  const { error } = await supabase
    .from('usuarios')
    .update({
      password_hash,
      password_updated_at: new Date().toISOString()
    })
    .eq('id', userId);

  if (error) {
    throw new Error(error.message);
  }
};

const updateSecurityQuestion = async (
  userId,
  pregunta_seguridad,
  respuesta_seguridad_hash
) => {

  const { error } = await supabase
    .from('usuarios')
    .update({
      pregunta_seguridad,
      respuesta_seguridad_hash
    })
    .eq('id', userId);

  if (error) {
    throw new Error(error.message);
  }
};

const createUser = async (userData) => {

  const { data, error } = await supabase
    .from('usuarios')
    .insert([userData])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const findUserByUsernameAndCountry = async (
  username,
  pais_id
) => {

  const { data, error } = await supabase
    .from('usuarios')
    .select(`
      id,
      nombre,
      apellido,
      email,
      username,
      password_hash,
      estado,
      pais_id,
      roles (
        id,
        nombre
      ),
      paises (
        id,
        nombre,
        codigo,
        slug
      )
    `)
    .eq('username', username)
    .eq('pais_id', pais_id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

module.exports = {
  findUserByUsername,
  findUserByUsernameAndCountry,
  updateLastAccess,
  findUserByIdentifier,
  findUserById,
  updatePassword,
  updateSecurityQuestion,
  createUser,
};