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

export const translateOrientationType = (type) => {
  const translation = {
    finalPaper: 'Projeto Final',
    undergraduateResearch: 'Iniciação científica',
    thesis: 'Tese',
    dissertation: 'Dissertação',
  }

  return translation[type]
}
