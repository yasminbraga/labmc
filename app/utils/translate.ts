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
    finalPaper: 'Projetos Finais',
    undergraduateResearch: 'Iniciação científica',
    thesis: 'Teses',
    dissertation: 'Dissertações',
  }

  return translation[type]
}
