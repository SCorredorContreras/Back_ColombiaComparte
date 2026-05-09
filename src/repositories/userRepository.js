const supabase = require('../config/supabase');

const findAllUsers = async () => {
  const { data, error } = await supabase
    .from('usuarios')
    .select(`
      id,
      nombre,
      apellido,
      email,
      username,
      estado,
      created_at,
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
    .order('id', { ascending: true });

  if (error) throw new Error(error.message);

  return data;
};

const findUserByUsernameOrEmail = async (username, email) => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('id, username, email')
    .or(`username.eq.${username},email.eq.${email}`)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data;
};


const updateUserStatus = async (id, estado) => {
  const { data, error } = await supabase
    .from('usuarios')
    .update({ estado })
    .eq('id', id)
    .select('id, estado')
    .single();

  if (error) throw new Error(error.message);

  return data;
};

const createUser = async (payload) => {
  const { data, error } = await supabase
    .from('usuarios')
    .insert([payload])
    .select(`
      id,
      nombre,
      apellido,
      email,
      username,
      estado,
      created_at
    `)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

const updateUserPassword = async (
  userId,
  password_hash
) => {

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

module.exports = {
  findAllUsers,
  findUserByUsernameOrEmail,
  createUser,
  updateUserStatus,
  updateUserPassword,
};