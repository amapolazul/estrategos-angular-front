export const navigation = [
    {
        'id'      : 'applications',
        'title'   : 'Opciones',
        'translate': 'NAV.APPLICATIONS',
        'type'    : 'group',
        'children': [
            {
                'id'   : 'home',
                'title': 'Inicio',
                'translate': 'NAV.SAMPLE.TITLE',
                'type' : 'item',
                'icon' : 'email',
                'url'  : '/home',
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
                'children' : [
                    {
                      'id'        : 'riesgos',
                      'title'     : 'Administracion del riesgo',
                      'type'      : 'item',
                      'url'       : 'administracion-riesgos',
                    },
                    {
                      'id'        : 'riesgos',
                      'title'     : 'Declaracion del riesgo',
                      'type'      : 'item',
                      'url'       : 'declaracion-riesgos',
                    }
                  ]
            },
          /*
          {
                'id': 'system-table',
                'title': 'Tablas de sistema',
                'type': 'collapse',
                'icon': 'extension',
                'children' : [
                    {
                        'id'        : 'rating',
                        'title'     : 'Calificación del riesgo',
                        'type'      : 'item',
                        'url'       : 'tablas-sistema/calificacion',
                        'exactMatch': true
                    },
                    {
                        'id'        : 'probability',
                        'title'     : 'Probabilida del riesgo',
                        'type'      : 'item',
                        'url'       : '/tablas-sistema/probabilidad',
                        'exactMatch': true
                    },
                    {
                        'id'        : 'impact',
                        'title'     : 'Impactos',
                        'type'      : 'item',
                        'url'       : '/tablas-sistema/impacto',
                        'exactMatch': true
                    },
                    {
                        'id'        : 'causes',
                        'title'     : 'Causas del riesgo',
                        'type'      : 'item',
                        'url'       : 'tablas-sistema/causas',
                        'exactMatch': true
                    },
                    {
                      'id'        : 'tipos',
                      'title'     : 'Tipos de riesgos',
                      'type'      : 'item',
                      'url'       : 'tablas-sistema/tipos',
                      'exactMatch': true
                    }
                ]
            }
            */
        ]
    }
];
