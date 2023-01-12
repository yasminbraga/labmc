export const translateMemberType = (type) => {
  const translation = {
    researcher: 'Professores',
    graduation: 'Graduandos',
    master: 'Mestrandos',
    doctorate: 'Doutorandos',
    egress: 'Egressos',
    technician: 'Técnicos',
  }

  return translation[type]
}
