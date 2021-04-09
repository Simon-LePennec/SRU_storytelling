var config = {
    style: 'mapbox://styles/branigan/cjz37rcb003ib1cr3s8rnkt2d',
    accessToken: 'pk.eyJ1Ijoia2FtaXNvbCIsImEiOiJjamR2cXl3dzUwM3l0MnJvNnp5ZHlpczUwIn0.3pm6x8Nm9rsl0I7RML6zJw',
    showMarkers: false,
    theme: 'dark',
    use3dTerrain: false,
    title: 'La loi "SRU"',
    subtitle: 'Quels territoires concernés par les quotas de logements sociaux ?',
    byline: '',
    footer: '<ul>Sources: <li><a href="https://www.cohesion-territoires.gouv.fr/loi-solidarite-et-renouvellement-urbain-sru">Ministère de la Cohésion des Territoires et des Relations avec les Collectivités Territoriales</a></li><li><a href="https://www.legifrance.gouv.fr/loda/id/LEGIARTI000029329940/2014-08-04/">Légifrance</a></li><li><a href="https://fr.wikipedia.org/wiki/Loi_relative_%C3%A0_la_solidarit%C3%A9_et_au_renouvellement_urbains#%C3%89volution_de_l\'article_55">Wikipédia</a></li></ul>',
    chapters: [
        {
            id: 'glacier-np',
            alignment: 'center',
            title: 'La loi du 13 décembre 2000 relative à la solidarité et au renouvellement urbain, appelée Loi SRU, est un texte complexe qui modifie en profondeur le droit de l’urbanisme et du logement en France. L’article 55 de cette loi impose à certaines communes de disposer d’un nombre minimum de logements sociaux.',
            image: './data/illustration.jpg',
            description: '<p>La liste des communes concernées par cet article est issue de critères particulièrement complexes. Plusieurs seuils de logements sociaux à atteindre existent en fonction de la population et la dynamique démographique de chaque commune, mais aussi de celles de son intercommunalité et de la région dans laquelle elle se trouve. Des exeptions existent également, et les critères ont fait l\objet de plusieurs ajustements dans le temps.</p><p>Cette datavisualiation propose de revoir tous ces critères en cartes pour analyser la répartition spatiale des territoires concernés par les quotas de logements sociaux en France</p>',
            location: {
                center: [-4.88236, 46.71703],
                zoom: 5,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'gnpglaciers-1998',
                    opacity: 0.25
                },
                {
                    layer: 'glaciernp-boundary',
                    opacity: 0.25
                }
            ],
            onChapterExit: [
                {
                    layer: 'glaciernp-boundary',
                    opacity: 0
                }
            ]
        },
        {
            id: '01',
            alignment: 'left',
            title: 'I. La règle générale',
            image: '',
            description: '<p>"Les communes de plus de 3 500 habitants – et de 1 500 habitants dans l’agglomération parisienne – appartenant à des agglomérations ou intercommunalités de plus de 50 000 habitants comprenant au moins une commune de plus de 15 000 habitants doivent disposer de 25 % de logement social"</p><p>Voici le découpage des intercommunalités françaises, et les communes de plus de 1 500, 3 000 et 15 000 habitants au 1er janvier 2021</p> <p>(Source : EPCI, Admin-Express, IGN | Population légale 2018, Recensement de la population, INSEE). </p>',
            location: {
                center: [-4.88236, 46.71703],
                zoom: 5.25,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [{
                layer: 'EPCI',
                opacity: 1
            }],
            onChapterExit: [
            ]
        },
        {
            id: '02',
            alignment: 'left',
            title: '',
            image: '',
            description: '<p>Et voici les  (Source : ) </p>',
            location: {
                center: [-4.88236, 46.71703],
                zoom: 5.25,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [{
                layer: 'EPCI',
                opacity: 1
            }],
            onChapterExit: [
                {
                    layer: 'EPCI',
                    opacity: 0
                }
            ]
        },
        {
            id: 'harrison2015',
            alignment: 'left',
            title: 'II.',
            image: '',
            description: 'Dans les communes appartenant à des territoires dont la situation locale ne justifie pas un renforcement des obligations de production, cette obligation est fixée à 20 % de logements sociaux.',
            location: {
                center: [-4.88236, 46.71703],
                zoom: 5.25,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'gnpglaciers-2015',
                    opacity: 0.25
                }
            ],
            onChapterExit: [
                {
                    layer: 'gnpglaciers-2015',
                    opacity: 0
                }
            ]
        },
        {
            id: 'blackfoot1998',
            alignment: 'left',
            title: 'III.',
            image: '',
            description: 'Les communes de plus de 15 000 habitants en croissance démographique de plus de 5 %, ne se situant pas dans les territoires précités et justifiant d’un effort de production supplémentaire au vu du fonctionnement de leur marché local de l’habitat, ont également l’obligation de disposer de 20 % de logements sociaux',
            location: {
                center: [-4.88236, 46.71703],
                zoom: 5.25,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'blackfoot2015',
            alignment: 'left',
            title: 'IV. Les exeptions à la règle',
            image: '',
            description: 'De plus, la loi égalité et citoyenneté du 27 janvier 2017 a révisé les conditions d’exemption des communes du dispositif SRU et un décret, pris par le ministre en charge du logement en début de chaque période triennale, fixe, pour une durée de trois ans, la liste des communes exemptées des obligations de mixité sociale',
            location: {
                center: [-4.88236, 46.71703],
                zoom: 5.25,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'gnpglaciers-2015',
                    opacity: 0.25
                }
            ],
            onChapterExit: [
                {
                    layer: 'gnpglaciers-2015',
                    opacity: 0
                }
            ]
        },
        {
            id: 'agassiz1998',
            alignment: 'left',
            title: 'Agassiz Glacier, 1998',
            image: '',
            description: 'Agassiz Glacier is in Glacier National Park in the U.S. state of Montana. It is named after Louis Agassiz, a Swiss-American glaciologist. The glacier is situated in a cirque to the southeast of Kintla Peak west of the Continental Divide. Agassiz Glacier is one of several glaciers that have been selected for monitoring by the U.S. Geological Survey\'s Glacier Monitoring Research program, which is researching changes to the mass balance of glaciers in and surrounding Glacier National Park.',
            location: {
                center: [-4.88236, 46.71703],
                zoom: 5.25,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'agassiz2015',
            alignment: 'left',
            title: 'Agassiz Glacier, 2015',
            image: '',
            description: 'Between 1998 and 2015, Agassiz Glacier lost 108 acres of surface area (about 37%).',
            location: {
                center: [-4.88236, 46.71703],
                zoom: 5.25,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'gnpglaciers-2015',
                    opacity: 0.25,
                }
            ],
            onChapterExit: [
                {
                    layer: 'gnpglaciers-2015',
                    opacity: 0
                }
            ]
        },
        {
            id: 'rainbow1998',
            alignment: 'left',
            title: 'Rainbow Glacier, 1998',
            image: '',
            description: 'Rainbow Glacier is in Glacier National Park in the U.S. state of Montana. The glacier is situated immediately to the east of Rainbow Peak at an elevation between 8,500 feet (2,600 m) and 8,000 feet (2,400 m) above sea level. The glacier has visible crevasses in satellite imagery. Rainbow Glacier has shown modest retreat compared to other glaciers in Glacier National Park.',
            location: {
                center: [-4.88236, 46.71703],
                zoom: 5.25,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'rainbow2015',
            alignment: 'left',
            title: 'Rainbow Glacier, 2015',
            image: '',
            description: 'Between 1998 and 2015, Rainbow Glacier lost 17 acres of surface area (about 6%).',
            location: {
                center: [-4.88236, 46.71703],
                zoom: 5.25,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'gnpglaciers-2015',
                    opacity: 0.25
                }
            ],
            onChapterExit: [
                {
                    layer: 'gnpglaciers-2015',
                    opacity: 0
                }
            ]
        },
        {
            id: 'kintla1998',
            alignment: 'left',
            title: 'Kintla Glacier, 1998',
            image: '',
            description: 'Kintla Glacier is in Glacier National Park in the U.S. state of Montana. The glacier is situated on a plateau 2 miles (3.2 km) southwest of Kintla Peak at an elevation between 8,700 feet (2,700 m) and 7,700 feet (2,300 m) above sea level. The glacier has numerous crevasses and is actually two glaciers.',
            location: {
                center: [-4.88236, 46.71703],
                zoom: 5.25,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'kintla2015',
            alignment: 'left',
            title: 'Kintla Glacier, 2015',
            image: '',
            description: 'Between 1998 and 2015, Harrison Glacier lost 24 acres of surface area (about 10%).',
            location: {
                center: [-4.88236, 46.71703],
                zoom: 5.25,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'gnpglaciers-2015',
                    opacity: 0.25
                }
            ],
            onChapterExit: [
                {
                    layer: 'gnpglaciers-2015',
                    opacity: 0
                }
            ]
        },
        {
            id: 'sperry1998',
            alignment: 'left',
            title: 'Sperry Glacier, 1998',
            image: '',
            description: 'Sperry Glacier is a glacier on the north slopes of Gunsight Mountain west of the Continental Divide in Glacier National Park in the U.S. state of Montana. Although many geologic features of Glacier National Park were formed during the much longer period of glaciation ending over 10,000 years ago, Sperry Glacier — like all the glaciers in the park today — is a product of the recent Little Ice Age, the period of cooler average temperatures starting in about the 13th century and concluding in the mid-19th century.',
            location: {
                center: [-4.88236, 46.71703],
                zoom: 5.25,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'sperry2015',
            alignment: 'left',
            title: 'Sperry Glacier, 2015',
            image: '',
            description: 'Between 1998 and 2015, Harrison Glacier lost 37 acres of surface area (about 16%).',
            location: {
                center: [-4.88236, 46.71703],
                zoom: 5.25,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'gnpglaciers-2015',
                    opacity: 0.25
                }
            ],
            onChapterExit: [
                {
                    layer: 'gnpglaciers-2015',
                    opacity: 0
                }
            ]
         }
    ]
};