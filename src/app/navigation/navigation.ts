export const navigation = [
  {
    'id': 'applications',
    'title': 'Opciones',
    'translate': 'NAV.APPLICATIONS',
    'type': 'group',
    'children': [
      {
        'id': 'home',
        'title': 'Inicio',
        'translate': 'NAV.SAMPLE.TITLE',
        'type': 'item',
        'icon': 'email',
        'url': '/home',
      },
      {
        'id': 'procesos',
        'title': 'procesos',
        'type': 'item',
        'icon': 'create_new_folder',
        'url': '/procesos'
      },
      {
        'id': 'riesgos',
        'title': 'Riesgos',
        'type': 'item',
        'icon': 'access_alarm',
        'url': '/riesgos',
        'children': [
          {
            'id': 'riesgos',
            'title': 'Administracion del riesgo',
            'type': 'item',
            'url': 'administracion-riesgos',
          },
          {
            'id': 'riesgos',
            'title': 'Declaracion del riesgo',
            'type': 'item',
            'url': 'declaracion-riesgos',
          }
        ]
      },

      {
        'id': 'probabilidad-impacto',
        'title': 'Matriz probabilidad impacto',
        'type': 'item',
        'icon': 'extension',
        'url': '/probabilidad-impacto'
      }

    ]
  }
];
