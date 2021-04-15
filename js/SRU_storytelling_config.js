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
            id: '00',
            alignment: 'center',
            title: 'La loi du 13 décembre 2000 relative à la solidarité et au renouvellement urbain, appelée Loi SRU, est un texte complexe qui modifie en profondeur le droit de l’urbanisme et du logement en France. L’article 55 de cette loi impose à certaines communes de disposer d’un nombre minimum de logements sociaux.',
            image: './data/img/illustration.jpg',
            description: '<p>La liste des communes concernées par cet article est issue de critères particulièrement complexes. Plusieurs seuils de logements sociaux à atteindre existent selon la population et la dynamique démographique de chaque commune, de son intercommunalité et de sa région. Des exeptions existent, et les critères ont été ajustés plusieurs fois dans le temps.</p><p>Cette datavisualiation propose de revoir tous ces critères en cartes pour identifier les territoires concernés par les quotas de logements sociaux en France</p>    <p style="text-align:center"><i>Vous pouvez vous déplacer sur la carte, et zoomer avec les contrôles en haut à droite de l\'écran</i></p>',
            location: {
                center: [-4.88236, 46.71703],
                zoom: 5,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
            ],
            onChapterExit: [
            ],
            flyAnimation: true
        },
        {
            id: '01',
            alignment: 'left',
            title: 'I. La règle générale',
            image: '',
            description: '<p><i>"Les communes de plus de 3 500 habitants – et de 1 500 habitants dans l’agglomération parisienne – appartenant à des agglomérations ou intercommunalités de plus de 50 000 habitants comprenant au moins une commune de plus de 15 000 habitants doivent disposer de 25 % de logement social"</i></p>    <p>Pour commencer il existe un seuil de population différent qui ciblait à l\'origine la région Île de France, mais que la loi Elan a recentré sur "l\'agglomération parisienne". Il s\'agit en réalité de l\'unité urbaine de Paris telle que définie par l\'INSEE <a href="https://www.insee.fr/fr/information/4802589" target="_blank">ici</a>.</p>    <p>Voici les limites de cette unité urbaine et les communes de plus de 3 000 et 1 500 habitants au 1er janvier 2021</p>    <p class="legend">Population municipale légale 2021 :</p>    <p class="innerLegendLine"><span class="legend-key" style="background-color:#ff9409"></span> > 3 000 (hors agglomération parisienne)</p>    <p class="innerLegendLine"><span class="legend-key" style="background-color:#ffcb47"></span> > 1 500 (dans l\'agglomération parisienne) </p><p class="innerLegendLine" style="margin-top:10px"><a style="display:inline-block;width:18px;height:8px;border:2px solid black;"></a> : Unité urbaine de Paris</p></p>    <p>(Source : Admin-Express, IGN | Population légale 2018, Recensement de la population, INSEE | <a href="https://questions.assemblee-nationale.fr/q15/15-19395QE.htm" target="_blank">JO de l’Assemblée nationale du 09/07/2019</a>).</p>',
            location: {
                center: [-4.88236, 46.71703],
                zoom: 5.25,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [{
                layer: 'communes_1500_UUparis',
                opacity: 1
            },{
                layer: 'communes_3000',
                opacity: 1
            },{
                layer: 'UUparis_2020',
                opacity: 1
            }],
            onChapterExit: [{
                layer: 'communes_1500_UUparis',
                opacity: 0
            },{
                layer: 'communes_3000',
                opacity: 0
            },{
                layer: 'UUparis_2020',
                opacity: 0
            }],
            flyAnimation: true
        },
        {
            id: '02',
            alignment: 'left',
            title: '',
            image: '',
            description: '<p>Le texte cite ensuite les "agglomérations ou intercommunalités". Il s\'agit de l\'échelle géographique des <a href="https://fr.wikipedia.org/wiki/%C3%89tablissement_public_de_coop%C3%A9ration_intercommunale" target="_blank">EPCI</a> dont voici le découpage au 1er janvier 2021. Ceux ci doivent comporter au moins une commune de plus de 15 000 habitants</p>    <p class="legend">Population municipale légale 2021 :</p>    <p class="innerLegendLine"><span class="legend-key" style="background-color:#e20016"></span> > 15 000</p>    <p class="innerLegendLine"><span class="legend-key" style="background-color:#ff9409"></span> > 3 000 (hors agglomération parisienne)</p>    <p class="innerLegendLine"><span class="legend-key" style="background-color:#ffcb47"></span> > 1 500 (dans l\'agglomération parisienne) </p><p class="innerLegendLine" style="margin-top:10px"><a style="display:inline-block;width:19px;height:9px;border:1px solid black;"></a> : Limites des EPCI</p></p>    <p>(Source : Admin-Express, IGN) </p>',
            location: {
                center: [-4.88236, 46.71703],
                zoom: 5.25,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [{
                layer: 'EPCI',
                opacity: 1
            },{
                layer: 'communes_15000',
                opacity: 1
            },{
                layer: 'communes_1500_UUparis',
                opacity: 1
            },{
                layer: 'communes_3000',
                opacity: 1
            }],
            onChapterExit: [{
                layer: 'EPCI',
                opacity: 0
            },{
                layer: 'communes_15000',
                opacity: 0
            },{
                layer: 'communes_1500_UUparis',
                opacity: 0
            },{
                layer: 'communes_3000',
                opacity: 0
            }]
        },
        {
            id: '03',
            alignment: 'left',
            title: '',
            image: '',
            description: '<p>Enfin, l\'EPCI lui même doit compter plus de 50 000 habitants. En applicant un masque sur les EPCI de moins de 50 000 habitant ou ne comptant pas au moins une commune de plus de 15 000 habitants, on voit enfin apparaitre les communes à priori soumises à la règle de 25% de logement social au regard du parc principal</p>',
            location: {
                center: [-4.88236, 46.71703],
                zoom: 5.25,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [{
                layer: 'EPCI',
                opacity: 0
            },{
                layer: 'EPCI_mask',
                opacity: 1
            },{
                layer: 'communes_1500_UUparis',
                opacity: 1
            },{
                layer: 'communes_3000',
                opacity: 1
            },{
                layer: 'communes_15000',
                opacity: 1
            }],
            onChapterExit: [{
                layer: 'EPCI',
                opacity: 0
            },{
                layer: 'EPCI_mask',
                opacity: 0
            },{
                layer: 'communes_1500_UUparis',
                opacity: 0
            },{
                layer: 'communes_3000',
                opacity: 0
            },{
                layer: 'communes_15000',
                opacity: 0
            }]
        },
        {
            id: '04',
            alignment: 'left',
            title: 'II. Les communes soumises au seuil de 20% de logement social',
            image: '',
            description: 'Dans les communes appartenant à des territoires dont la situation locale ne justifie pas un renforcement des obligations de production, cette obligation est fixée à 20 % de logements sociaux.',
            location: {
                center: [-4.88236, 46.71703],
                zoom: 5.25,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
            ],
            onChapterExit: [
            ]
        },
        {
            id: '05',
            alignment: 'left',
            title: 'III. Les communes en forte croissance démographique',
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
            id: '06',
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
        }
    ]
};