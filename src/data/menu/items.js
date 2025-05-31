export const initialMenuDataFiltered = {
  supe: [
    {
      id: 'supa1',
      nameKey: 'supaZeamaName', defaultName: 'Zeamă de pui',
      descriptionKey: 'supaZeamaDesc', defaultDescription: 'Traditional Moldovan chicken noodle soup, light and flavorful.',
      price: 9.50,
      imageText: "Bowl of traditional Moldovan Zeama soup with chicken and noodles",
      imageSrc: 'images/menu/soup.png',
      categoryId: 'supe'
    },
    {
      id: 'supa2',
      nameKey: 'supaCiorbaBurtaName', defaultName: 'Ciorbă de burtă',
      descriptionKey: 'supaCiorbaBurtaDesc', defaultDescription: 'Hearty and sour tripe soup, a beloved classic.',
      price: 11.00,
      imageText: "Rich Ciorba de burta (tripe soup) with sour cream",
      imageSrc: 'images/menu/supa-pui.png',
      categoryId: 'supe'
    },
    {
      id: 'supa3',
      nameKey: 'supaGalusteName', defaultName: 'Supă cu găluște',
      descriptionKey: 'supaGalusteDesc', defaultDescription: 'Clear soup with fluffy semolina dumplings.',
      price: 8.75,
      imageText: "Comforting Supa cu galuste (dumpling soup) in a bowl",
      imageSrc: 'images/menu/supa-galuste.png',
      categoryId: 'supe'
    },
    {
      id: 'supa4',
      nameKey: 'supaCiuperciName', defaultName: 'Supă de ciuperci',
      descriptionKey: 'supaCiuperciDesc', defaultDescription: 'Creamy mushroom soup with fresh herbs.',
      price: 9.00,
      imageText: "Creamy mushroom soup with croutons",
      imageSrc: '/images/special-meals/soup.jpg', // Add your real image if available
      categoryId: 'supe'
    }
  ],
  feluriPrincipale: [
    {
      id: 'fp1',
      nameKey: 'mainMamaligaName', defaultName: 'Mămăligă cu brânză și smântână',
      descriptionKey: 'mainMamaligaDesc', defaultDescription: 'Warm polenta served with traditional sheep cheese and sour cream.',
      price: 15.00,
      imageText: "Plate of Mamaliga with Moldovan cheese and sour cream",
      imageSrc: 'images/menu/mamaliga.png',
      categoryId: 'feluriPrincipale'
    },
    {
      id: 'fp2',
      nameKey: 'mainSarmaleName', defaultName: 'Sarmale',
      descriptionKey: 'mainSarmaleDesc', defaultDescription: 'Cabbage rolls stuffed with minced meat and rice, served with sour cream.',
      price: 17.50,
      imageText: "Traditional Moldovan Sarmale (cabbage rolls) with a side of polenta",
      imageSrc: 'images/menu/sarmale.png',
      categoryId: 'feluriPrincipale'
    },
    {
      id: 'fp3',
      nameKey: 'mainChifteleName', defaultName: 'Chifteluțe cu piure',
      descriptionKey: 'mainChifteleDesc', defaultDescription: 'Flavorful meatballs served with creamy mashed potatoes.',
      price: 16.00,
      imageText: "Juicy Chiftele (meatballs) with mashed potatoes and gravy",
      imageSrc: 'images/menu/chiftele.png',
      categoryId: 'feluriPrincipale'
    },
    {
      id: 'fp4',
      nameKey: 'mainArdeiUmplutiName', defaultName: 'Ardei umpluți',
      descriptionKey: 'mainArdeiUmplutiDesc', defaultDescription: 'Bell peppers stuffed with a savory mixture of rice and meat.',
      price: 16.50,
      imageText: "Baked Ardei umpluti (stuffed peppers) in tomato sauce",
      imageSrc: 'images/menu/chiperi-umpluti.png',
      categoryId: 'feluriPrincipale'
    },
    {
      id: 'fp5',
      nameKey: 'mainPestePrajitName', defaultName: 'Pește prăjit cu mămăliguță',
      descriptionKey: 'mainPestePrajitDesc', defaultDescription: 'Crispy fried fish (carp or trout) served with polenta and garlic sauce (mujdei).',
      price: 19.00,
      imageText: "Crispy fried fish with a side of mamaliga and mujdei",
      imageSrc: 'images/menu/peste.png',
      categoryId: 'feluriPrincipale'
    },
    {
      id: 'fp6',
      nameKey: 'mainTocanaName', defaultName: 'Tocană de porc',
      descriptionKey: 'mainTocanaDesc', defaultDescription: 'Slow-cooked pork stew with onions, garlic, and a rich sauce, often served with mămăligă.',
      price: 18.00,
      imageText: "Hearty Tocana de porc (pork stew) with mamaliga",
      imageSrc: 'images/menu/tocanita.png',
      categoryId: 'feluriPrincipale'
    }
  ],
  placintePatiserii: [
    {
      id: 'pp1',
      nameKey: 'placinteBranzaName', defaultName: 'Plăcinte cu brânză',
      descriptionKey: 'placinteBranzaDesc', defaultDescription: 'Traditional Moldovan pies filled with salty or sweet cheese.',
      price: 7.00,
      imageText: "Golden Placinte cu branza (cheese pies)",
      imageSrc: 'images/menu/placinta-branza.png',
      categoryId: 'placintePatiserii'
    },
    {
      id: 'pp2',
      nameKey: 'placinteCartofiName', defaultName: 'Plăcinte cu cartofi',
      descriptionKey: 'placinteCartofiDesc', defaultDescription: 'Savory pies filled with mashed potatoes and onions.',
      price: 6.50,
      imageText: "Warm Placinte cu cartofi (potato pies)",
      imageSrc: 'images/menu/placinta-cartofi.png',
      categoryId: 'placintePatiserii'
    },
    {
      id: 'pp3',
      nameKey: 'placinteVarzaName', defaultName: 'Plăcinte cu varză',
      descriptionKey: 'placinteVarzaDesc', defaultDescription: 'Delicious pies filled with sautéed cabbage.',
      price: 6.75,
      imageText: "Flaky Placinte cu varza (cabbage pies)",
      imageSrc: 'images/menu/placinta-varza.png',
      categoryId: 'placintePatiserii'
    },
    {
      id: 'pp4',
      nameKey: 'placinteDovleacName', defaultName: 'Plăcinte cu dovleac',
      descriptionKey: 'placinteDovleacDesc', defaultDescription: 'Sweet pies filled with spiced pumpkin puree.',
      price: 7.25,
      imageText: "Sweet Placinte cu dovleac (pumpkin pies)",
      imageSrc: 'images/menu/placinta-dovleac.png', // Add image
      categoryId: 'placintePatiserii'
    }
  ],
  deserturi: [
    {
      id: 'des1',
      nameKey: 'desertCusmaGugutaName', defaultName: 'Cușma lui Guguță',
      descriptionKey: 'desertCusmaGugutaDesc', defaultDescription: 'Iconic Moldovan crepe cake layered with sour cherry filling and cream.',
      price: 10.00,
      imageText: "Slice of Cusma lui Guguta cake with sour cherries",
      imageSrc: 'images/menu/cusma-guguta.png',
      categoryId: 'deserturi'
    },
    {
      id: 'des2',
      nameKey: 'desertPruneUmpluteName', defaultName: 'Prune uscate umplute cu nuci',
      descriptionKey: 'desertPruneUmpluteDesc', defaultDescription: 'Dried plums stuffed with walnuts, often served with cream or honey.',
      price: 8.50,
      imageText: "Elegant Prune uscate umplute cu nuci (stuffed dried plums)",
      imageSrc: 'images/menu/nuci.png',
      categoryId: 'deserturi'
    },
    {
      id: 'des3',
      nameKey: 'desertCozonacName', defaultName: 'Cozonac Moldovenesc',
      descriptionKey: 'desertCozonacDesc', defaultDescription: 'Traditional sweet bread with walnut, poppy seed, or cocoa filling.',
      price: 9.00,
      imageText: "Slice of Moldovan Cozonac sweet bread",
      imageSrc: 'images/menu/cozonac.png',
      categoryId: 'deserturi'
    },
    {
      id: 'des4',
      nameKey: 'desertBabaNeagraName', defaultName: 'Babă Neagră',
      descriptionKey: 'desertBabaNeagraDesc', defaultDescription: 'A unique, dark, moist cake made with kefir and soda, a traditional delight.',
      price: 9.50,
      imageText: "Slice of traditional Moldovan Baba Neagra cake",
      imageSrc: 'images/menu/baba-neagra.png', // Add your real image
      categoryId: 'deserturi'
    }
  ],
  bauturi: [
    {
      id: 'btr1',
      nameKey: 'bauturaCompotName', defaultName: 'Compot de casă',
      descriptionKey: 'bauturaCompotDesc', defaultDescription: 'Homemade fruit compote, served chilled or warm.',
      price: 4.00,
      imageText: "Glass of homemade fruit compot",
      imageSrc: 'images/menu/compot.png',
      categoryId: 'bauturi'
    },
    {
      id: 'btr2',
      nameKey: 'bauturaVinCasaName', defaultName: 'Vin de casă (roșu/alb)',
      descriptionKey: 'bauturaVinCasaDesc', defaultDescription: 'Traditional homemade red or white wine.',
      price: 6.00,
      imageText: "Carafe of Moldovan homemade wine",
      imageSrc: 'images/menu/wine.png',
      categoryId: 'bauturi'
    },
    {
      id: 'btr3',
      nameKey: 'bauturaMustName', defaultName: 'Must proaspăt',
      descriptionKey: 'bauturaMustDesc', defaultDescription: 'Freshly pressed grape juice (seasonal).',
      price: 5.00,
      imageText: "Glass of fresh Moldovan must (grape juice)",
      imageSrc: 'images/menu/must.png',
      categoryId: 'bauturi'
    },
    {
      id: 'btr4',
      nameKey: 'bauturaCeaiPlanteName', defaultName: 'Ceai de plante medicinale',
      descriptionKey: 'bauturaCeaiPlanteDesc', defaultDescription: 'Herbal tea made from local medicinal plants like linden, mint, or chamomile.',
      price: 3.50,
      imageText: "Cup of aromatic herbal tea",
      imageSrc: 'images/menu/ceai-plante.png', // Add image if available
      categoryId: 'bauturi'
    }
  ]
};

export const getAllMenuItems = () => {
  let allItems = [];
  for (const categoryKey in initialMenuDataFiltered) {
    allItems = allItems.concat(initialMenuDataFiltered[categoryKey]);
  }
  return allItems;
};
