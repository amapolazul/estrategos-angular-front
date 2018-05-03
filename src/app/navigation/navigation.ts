export const navigation = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'translate': 'NAV.APPLICATIONS',
        'type'    : 'group',
        'children': [
            {
                'id'   : 'sample',
                'title': 'Sample',
                'translate': 'NAV.SAMPLE.TITLE',
                'type' : 'item',
                'icon' : 'email',
                'url'  : '/sample',
                'badge': {
                    'title': 25,
                    'translate': 'NAV.SAMPLE.BADGE',
                    'bg'   : '#F44336',
                    'fg'   : '#FFFFFF'
                }
            },
            {
                'id': 'processes',
                'title': 'Crear procesos',
                'type': 'item',
                'icon': 'create_new_folder',
                'url': '/processes'
            },
            {
                'id': 'system-table',
                'title': 'Tablas de sistema',
                'type': 'collapse',
                'icon': 'extension',
                'url': '/system-table',     
                'children' : [
                    {
                        'id'        : 'rating',
                        'title'     : 'Calificación del riesgo',
                        'type'      : 'item',
                        'url'       : '/system-table/risk/rating'
                    },
                    {
                        'id'        : 'types',
                        'title'     : 'Tipos de riesgo',
                        'type'      : 'item',
                        'url'       : '/system-table/risk/types',
                    },
                    {
                        'id'        : 'probability',
                        'title'     : 'Probabilida del riesgo',
                        'type'      : 'item',
                        'url'       : '/system-table/risk/probability',
                    },
                    {
                        'id'        : 'impact',
                        'title'     : 'Impactos',
                        'type'      : 'item',
                        'url'       : '/system-table/risk/impact',
                    },
                    {
                        'id'        : 'causes',
                        'title'     : 'Causas',
                        'type'      : 'item',
                        'url'       : '/system-table/risk/causes',
                    }
                ]
            }
        ]
    }
];
   