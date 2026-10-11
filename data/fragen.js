/* Fragenpool für den Prüfungsmodus – nur offene Fragen (wie in der Klausur: kein Multiple Choice, ganze Sätze).
   kp = Erwartungshorizont: [Punkt, Punkte, [Suchmuster …]] – ein Punkt gilt als „erkannt“, wenn eines der Muster vorkommt.
   sicher: laut Professor sicher in der Klausur. */
window.FRAGEN = [
  /* ---------- sichere Klausurfragen ---------- */
  { id: "q-bri", kap: "k5", sicher: true, pts: 15, min: 15,
    q: "Erklären Sie die Belt and Road Initiative (Neue Seidenstraße): Was ist sie, woraus besteht sie, welche Ziele verfolgt China damit und wie ist sie zu bewerten?",
    kp: [
      ["2013 von Xi Jinping angekündigt (Kasachstan / Indonesien)", 2, ["2013", "xi jinping", "kasachstan", "indonesien"]],
      ["Strategie zum Ausbau von Handels- und Infrastrukturverbindungen nach Asien, Afrika, Europa", 2, ["infrastruktur", "handels.{0,20}verbindung", "asien.{0,30}(afrika|europa)"]],
      ["Belt = Landkorridore (Silk Road Economic Belt) über Zentralasien, Russland, Iran, Türkei", 2, ["economic belt", "landweg", "landkorridor", "zu land", "belt.{0,40}land", "schiene|bahn|eisenbahn"]],
      ["Road = Maritime Silk Road: Häfen, Seewege über Indischen Ozean und Suez ins Mittelmeer", 2, ["maritime", "seeweg", "zu wasser", "häfen|hafen", "road.{0,40}(see|meer|wasser)"]],
      ["Umfang: ~150 Staaten; Häfen, Bahnen, Straßen, Kraftwerke, Digital Silk Road", 1, ["150", "kraftwerk", "digital silk", "digitale"]],
      ["Beispiel: Piräus (COSCO, 2016) / Landbrücken Chongqing–Duisburg", 2, ["piräus|piraeus", "cosco", "duisburg", "chongqing", "landbrücke"]],
      ["Motive: Überkapazitäten, Westchina, Handelswege/Malakka, Absatzmärkte, geopolitischer Einfluss", 2, ["überkapazit", "westchina|westen chinas|xinjiang", "malakka", "absatzm", "einfluss", "geopoliti"]],
      ["Kritik: Schuldenfalle (Hambantota), Intransparenz, Abhängigkeit; Italien 2023 ausgetreten", 2, ["schuldenfalle|überschuld|verschuld", "hambantota|sri lanka", "transparen", "abhängig", "italien"]]
    ],
    model: "Die Belt and Road Initiative (BRI), auch Neue Seidenstraße genannt, ist eine Strategie Chinas, die Staatspräsident Xi Jinping 2013 in Kasachstan (Landweg) und Indonesien (Seeweg) vorstellte. Ihr Ziel ist der Ausbau von Handels- und Infrastrukturverbindungen nach Asien, Afrika und Europa. Vorbild ist die historische Seidenstraße, ein Netz von Karawanenwegen, das vom 1. bis 15. Jahrhundert Asien mit dem Mittelmeerraum verband. Die BRI hat zwei Komponenten: Der „Silk Road Economic Belt“ umfasst Landkorridore über Zentralasien, Russland, Iran und die Türkei nach Europa, etwa die Neue Eurasische Landbrücke mit Güterzügen von Chongqing nach Duisburg in rund 15 Tagen. Die „Maritime Silk Road des 21. Jahrhunderts“ verbindet Häfen und Seewege über Südostasien, den Indischen Ozean und den Suezkanal mit dem Mittelmeer. Rund 150 Staaten haben Kooperationsabkommen unterzeichnet; finanziert werden Häfen, Bahnen, Straßen, Kraftwerke und digitale Netze („Digital Silk Road“). In Europa ist der Hafen Piräus, seit 2016 mehrheitlich im Besitz der chinesischen Reederei COSCO, das bekannteste Beispiel. China verfolgt damit wirtschaftliche und geopolitische Ziele: Es kann Überkapazitäten etwa der Bauindustrie auslasten, Westchina erschließen, seine Handelswege diversifizieren und neue Absatzmärkte sowie politischen Einfluss gewinnen. Kritisiert werden die Gefahr der Überschuldung von Partnerländern („Schuldenfalle“, z. B. der Hafen Hambantota in Sri Lanka), mangelnde Transparenz und neue geopolitische Abhängigkeiten. Italien ist als einziges G7-Land Ende 2023 wieder ausgetreten. Seit dem Ukraine-Krieg ist zudem die Nordroute über Russland riskanter geworden, weshalb der Mittlere Korridor an Bedeutung gewinnt." },

  { id: "q-kennz", kap: "k3", sicher: true, pts: 10, min: 10,
    q: "Was sind die Kennzeichen der Globalisierung?",
    kp: [
      ["kontinuierlicher, (bislang als) nicht umkehrbar (angesehener) Prozess – ökonomisch, sozial, politisch", 2, ["kontinuierlich", "nicht umkehrbar|unumkehrbar|irreversib", "prozess"]],
      ["getrieben von den integrativen Kräften des Marktes", 2, ["integrativ", "kräfte des markt", "marktgetrieben", "markt.{0,20}(getrieben|kräfte|treib)"]],
      ["weltweite Verflechtung von Politik, Wirtschaft und Gesellschaft ohne Rücksicht auf Grenzen", 2, ["verflechtung", "grenze", "weltweit"]],
      ["Entankerung vom physischen Raum / Raum-Zeit-Verdichtung", 1, ["entanker", "verdichtung", "raum.{0,5}zeit", "schrumpf"]],
      ["Denationalisierung", 1, ["denationalis", "nationalstaat"]],
      ["Treiber: transnationale Unternehmen; Messgröße: Handel und Direktinvestitionen", 2, ["transnational|multinational|multis|konzern", "direktinvest|fdi|adi", "handel"]]
    ],
    model: "Globalisierung ist erstens ein ökonomischer, sozialer und politischer, kontinuierlicher Prozess, der bislang als nicht umkehrbar angesehen wurde. Zweitens wird sie von den integrativen Kräften des Marktes getrieben. Drittens bedeutet sie die weltweite Verflechtung von Politik, Wirtschaft und Gesellschaft ohne Rücksicht auf nationale Grenzen. Kennzeichnend sind außerdem die Entankerung ökonomischen Handelns vom physischen Raum, die Verdichtung von Raum und Zeit („die Erde schrumpft“) durch schnellere und billigere Transporte und Kommunikation, die Denationalisierung, also der Bedeutungsverlust nationaler Grenzen und Steuerungsmöglichkeiten, sowie die globale Verbreitung von Gütern, Wissen, Konsumpräferenzen und kulturellen Einstellungen. Treibende Kraft sind weniger die Nationalstaaten als transnationale Unternehmen, deren Zahl von rund 7.000 (1970) auf über 80.000 stieg. Gemessen wird die Globalisierung vor allem am Wachstum des Welthandels und der ausländischen Direktinvestitionen, die seit den 1980er-Jahren schneller wachsen als das Welt-BIP." },

  { id: "q-hyper", kap: "k3", sicher: true, pts: 10, min: 10,
    q: "Was sind die Gründe für die Hyperglobalisierung?",
    kp: [
      ["Definition: ca. 1990–2008, Handel wächst ~3 Prozentpunkte schneller als die Produktion", 2, ["1990", "schneller als", "3 prozent|drei prozent|prozentpunkt"]],
      ["sinkende Transport- und Kommunikationskosten (Container, Großschiffe, Internet)", 2, ["transportkosten|transport", "kommunikation", "container", "internet"]],
      ["Liberalisierung: Abbau von Zöllen/Investitionshemmnissen, Kapitalmärkte, GATS 1995, WTO/IWF", 2, ["liberalis", "zölle|zoll", "dereguli", "gats", "wto"]],
      ["WTO-Beitritt Chinas 2001", 2, ["china.{0,40}(wto|2001)|2001.{0,40}china|wto.{0,40}china"]],
      ["transnationale Unternehmen, globale Wertschöpfungsketten, Outsourcing, FDI", 1, ["wertschöpfungskette|lieferkette", "outsourc", "transnational|multinational|konzern", "direktinvest|fdi"]],
      ["Öffnung neuer Räume (Ende des Ostblocks 1989) / steigende Kaufkraft", 1, ["ostblock|1989|mauer|sowjet", "kaufkraft"]]
    ],
    model: "Als Hyperglobalisierung bezeichnet man die Phase von etwa 1990 bis zur Weltwirtschaftskrise 2008/09, in der das Importvolumen rund drei Prozentpunkte schneller wuchs als die Industrieproduktion. Ein wesentlicher Grund waren die stark sinkenden Transport- und Kommunikationskosten: Container und immer größere Schiffe senkten die Kosten je Transporteinheit, das Internet machte Kommunikation fast kostenlos – die Welt „schrumpfte“. Hinzu kam eine weitreichende Liberalisierung: Zölle und Investitionshemmnisse wurden abgebaut, Kapitalmärkte liberalisiert, und das Dienstleistungsabkommen GATS der WTO von 1995 sowie Organisationen wie Weltbank und IWF weiteten die Verflechtung aus. Transnationale Unternehmen nutzten diese Bedingungen, um im Sinne des Postfordismus Produktion auszulagern und globale Wertschöpfungsketten aufzubauen; die Direktinvestitionen wuchsen schneller als Handel und BIP. Schließlich öffneten sich neue Räume: Nach dem Ende des Ostblocks 1989 wurden die Reformländer integriert, und vor allem der WTO-Beitritt Chinas 2001 – de facto der Volleintritt in die Weltwirtschaft – gab der Globalisierung einen zusätzlichen Schub. Steigende Kaufkraft in vielen Ländern schuf zudem neue Absatzmärkte." },

  { id: "q-2008", kap: "k3", sicher: true, pts: 10, min: 10,
    q: "Warum ist der Welthandel 2008/09 eingebrochen, und was hat sich danach verändert?",
    kp: [
      ["Finanz- und Weltwirtschaftskrise 2008/09 → Nachfrage und Produktion brechen ein", 2, ["finanzkrise|weltwirtschaftskrise|wirtschaftskrise", "nachfrage", "produktion"]],
      ["weniger Gütermengen → Frachtraten fallen (China–Europa 1.500 → 300 USD)", 2, ["frachtrat|charterrat|containerpreis|transportpreis", "1\\.?500", "300"]],
      ["Überkapazität durch neue Supercontainerschiffe verschärft den Preisverfall", 2, ["überkapazit", "supercontainer|großschiff|neue schiffe|stellraum"]],
      ["Seismograf: BDI/Seefracht und Aktien brechen ein; auch Realwirtschaft (Autoindustrie, GM/Chrysler)", 1, ["baltic|bdi", "autoindustrie|gm|chrysler|ford", "aktie"]],
      ["danach Slowbalisation: Handel wächst nur noch wie die Produktion", 2, ["slowbali", "gleichschritt|nur noch|so schnell wie|im gleichen tempo"]],
      ["Gründe: mehr heimische Wertschöpfung, Regionalisierung der Lieferketten, Protektionismus", 1, ["heimische wertschöpfung|wertschöpfung", "regionalis", "protektion|zölle|handelsbeschränk"]]
    ],
    model: "Der Einbruch 2008/09 war eine Folge der globalen Finanz- und Weltwirtschaftskrise, die von der US-Immobilienkrise ausging und mit der Pleite von Lehman Brothers im September 2008 die Weltwirtschaft erfasste. Nachfrage und Produktion brachen weltweit ein, daher sank die Menge der zu transportierenden Güter stark. Weil die Seefracht ein Seismograf der Globalisierung ist, zeigte sich das sofort in den Frachtraten: Laut Maersk fiel der Preis für einen 20-Fuß-Container von China nach Europa von rund 1.500 USD im Dezember 2007 auf 300 USD im Dezember 2008; auch die Charterraten für Containerschiffe und der Baltic Dry Index stürzten ab. Verschärft wurde der Preisverfall durch Überkapazitäten, weil zahlreiche neue Supercontainerschiffe zusätzlichen Stellraum auf den Markt brachten. Die Krise traf auch die Realwirtschaft, etwa die US-Autoindustrie, wo GM und Chrysler Insolvenz anmelden mussten. Nach der Krise kehrte der Welthandel nicht zum alten Tempo zurück: Seit 2009 wächst er nur noch im Gleichschritt mit der Industrieproduktion – man spricht von Slowbalisation. Ein Indiz ist der steigende Anteil heimischer Wertschöpfung an den Exporten; politische Programme zur Regionalisierung der Lieferketten und zunehmender Protektionismus (ab 2025 verstärkt durch die US-Zollpolitik) lassen sogar eine Deglobalisierung erwarten." },

  { id: "q-irland", kap: "k4", sicher: true, pts: 15, min: 15,
    q: "Erklären Sie den Aufstieg Irlands von der Peripherie zum Boomgebiet – einschließlich der Kehrseiten.",
    kp: [
      ["Ausgangslage: 1987 nur 63 % des britischen BIP/Kopf, agrarisch, Auswanderung, Arbeitslosigkeit ~20 %", 2, ["63", "armenhaus", "agrar", "auswander", "peripherie"]],
      ["Boom ab 1994: zweistellige Raten, Ø 6 % vs. EU 2 %, „keltischer Tiger“", 1, ["1994|1995|1990er", "keltisch", "zweistellig|10 ?%|6 ?%"]],
      ["FDI-getragene Ansiedlungspolitik; Gateway to Europe für US-Multis (EWG 1973), 40 % der US-Investitionen", 2, ["direktinvest|fdi|ausländische investition|auslandsinvest", "gateway|tor nach europa|us-|amerikan", "1973|ewg"]],
      ["niedrige Steuern (Körperschaftsteuer 10 % / 12,5 %), Subventionen", 2, ["steuer", "10 ?%|12,5"]],
      ["junge, gut ausgebildete, englischsprachige Arbeitskräfte; IT-Infrastruktur, niedrige Kosten", 2, ["englisch", "jung", "ausgebildet|qualifiz", "telekom|infrastruktur|lohn"]],
      ["EU-Förderung (Struktur- und Kohäsionsfonds, 6 Mrd. ECU)", 1, ["strukturfonds|kohäsion|eu-förder|förderung|ecu"]],
      ["IDA: Strategiewechsel gegen duale Wirtschaft – Qualität statt Quantität, Bildung, Infrastruktur", 2, ["ida|industrial development", "duale|dual", "qualität"]],
      ["Kehrseiten: Abhängigkeit (Dell → Łódź), BIP überzeichnet (GNI*), Ungleichheit/Dublin, Immobilienblase, Bankenkrise, EU/IWF 85 Mrd. € 2010", 3, ["abhängig", "dell|łódź|lodz", "bnE|gni|bruttonational|gewinne.{0,30}ausland", "immobilien", "iwf|rettungsschirm|85", "ungleich|dublin"]]
    ],
    model: "Irland galt lange als Armenhaus Europas: 1987 lag das BIP pro Kopf nur bei 63 % des britischen Niveaus, die Wirtschaft war agrarisch geprägt, die Arbeitslosigkeit hoch und allein in den 1980er-Jahren wanderten 200.000 Menschen aus. Ab 1994 erlebte das Land jedoch ein „Wirtschaftswunder“ mit teils zweistelligen Wachstumsraten (1986–1996 im Schnitt rund 6 % gegenüber 2 % in der EU-15); der Economist prägte den Begriff „keltischer Tiger“. Grundlage war eine konsequente, von ausländischen Direktinvestitionen getragene Industrieansiedlungspolitik. Irland, seit 1973 Mitglied der EWG, wurde zum „Gateway to Europe“ für vor allem US-amerikanische Konzerne, die ein Standbein in der EU suchten; in den zehn Jahren vor der Finanzkrise gingen rund 40 % der US-Investitionen in Europa nach Irland. Ausschlaggebend waren sehr günstige Standortfaktoren: eine Körperschaftsteuer von nur 10 % (später 12,5 %), großzügige Subventionen, niedrige Betriebs-, Lohn- und Telekommunikationskosten, eine gute IT-Infrastruktur sowie junge, gut ausgebildete und englischsprachige Arbeitskräfte. Dazu kamen hohe EU-Förderungen aus Struktur- und Kohäsionsfonds. Entscheidend war auch der Strategiewechsel der Industrial Development Authority (IDA): Nachdem eine Studie 1982 eine duale Wirtschaft aus ausländischen Großbetrieben und unverbundenen heimischen Kleinbetrieben gezeigt hatte, setzte sie auf Qualität statt Quantität – also hochwertige Arbeitsplätze mit positiver Wirkung auf heimische Betriebe – und investierte in Bildung und Verkehrsinfrastruktur. So entstanden in den 1990er-Jahren viele Hightech-Arbeitsplätze in Pharma, Elektrotechnik und Software, Dublin wurde zum Finanzzentrum, und heute haben Google, Meta, Apple und Microsoft dort ihre Europazentralen; die Arbeitslosigkeit sank auf rund 4 %. Der Boom hatte aber Kehrseiten: Irland ist stark von Multis abhängig (2009 verlagerte Dell seine Produktion von Limerick nach Łódź), das BIP überzeichnet den Wohlstand, weil Konzerngewinne ins Ausland abfließen (daher das GNI*), die Ungleichheit und das Zentrum-Peripherie-Gefälle mit Dublin als Wachstumsinsel nahmen zu, und es entstand eine Immobilienblase. In der Finanzkrise schrumpfte die Wirtschaft 2008/09 um rund 4 bzw. 5 %, und Irland musste 2010 Hilfskredite von EU und IWF über 85 Mrd. € annehmen; Ende 2013 verließ es das Programm als eines der ersten Länder." },

  /* ---------- Kapitel 2 ---------- */
  { id: "q-grand", kap: "k2", pts: 8, min: 8,
    q: "Unterscheiden Sie „Grand Theories“ und „Small Theories“ der Wirtschaftsgeografie anhand je eines Beispiels.",
    kp: [
      ["Grand: umfassender Erklärungsanspruch über Bereiche hinweg, aber im Detail unscharf", 3, ["umfassend|über.{0,20}bereiche|übergreifend|allgemein", "unscharf|ungenau|trennschärfe"]],
      ["Small: kein allgemeiner Anspruch, dafür Tiefenschärfe (aber Reduktionismus)", 3, ["tiefenschärfe|genau|präzise|scharf", "reduktion|ausschnitt|kein allgemein"]],
      ["Beispiele: Regulationstheorie (grand) – Christaller/Hägerstrand (small)", 2, ["regulation", "christaller|hägerstrand|zentrale orte"]]
    ],
    model: "Grand Theories erheben den Anspruch, Zusammenhänge über verschiedene Bereiche hinweg umfassend zu erklären; dafür sind ihre Aussagen im Detail unscharf. Ein Beispiel ist die Regulationstheorie, die gesellschaftliche und wirtschaftliche Entwicklungen ganzer Epochen erklärt. Small Theories haben dagegen keinen allgemeinen Erklärungsanspruch, bieten aber eine bessere Tiefen- und Trennschärfe, wobei sie stärker reduktionistisch sind. Ein Beispiel ist Christallers Theorie der zentralen Orte. Nach Weichhart nimmt die Bedeutung der Grand Theories derzeit zu." },

  { id: "q-regul", kap: "k2", pts: 12, min: 12,
    q: "Erklären Sie mithilfe der Regulationstheorie den Übergang vom Fordismus zum Postfordismus.",
    kp: [
      ["Formation = Akkumulationsregime (Produktion + Konsum) passt zu Regulationsweise (Institutionen, Normen)", 3, ["akkumulationsregime", "regulationsweise", "formation"]],
      ["Wechsel/Krise, wenn beide nicht mehr zusammenpassen", 1, ["nicht mehr.{0,30}(passt|zusammen)|krise"]],
      ["Fordismus: Fließband, Taylorismus, standardisierte Massenproduktion und Massenkonsum", 2, ["fließband|taylor", "massenproduktion|massenkonsum|standardis"]],
      ["Fordistische Regulation: Sozialstaat, kollektive Lohnverhandlungen, Lohn an Produktivität gekoppelt", 1, ["sozialstaat|wohlfahrt|umverteilung", "lohnverhandl|sozialpartner|kollektiv"]],
      ["Krise: Märkte gesättigt, Ölpreisschocks 1973/79, Nachfrage differenziert sich", 3, ["gesättigt|sättigung", "öl", "differenz|individualis|segment"]],
      ["Postfordismus: flexible Produktion (Lean, JIT, Outsourcing), dezentrale, marktorientierte Regulation, Deregulierung", 2, ["flexib", "lean|just in time|jit|outsourc", "dereguli|dezentral|marktorient"]]
    ],
    model: "Nach der Regulationstheorie ist eine Formation stabil, solange das Akkumulationsregime – also die Art, wie produziert und konsumiert wird – zur Regulationsweise passt, das heißt zu den gesellschaftlichen Spielregeln aus Normen, Gesetzen und Institutionen wie Staat und Sozialpartnern. Passen beide nicht mehr zusammen, kommt es zur Krise und zu einer neuen Formation. Im Fordismus (ca. 1900–1975) wurde nach dem Taylorismus am Fließband standardisiert und in Masse produziert; dem entsprach ein Massenkonsum standardisierter Güter. Die Regulationsweise war durch kollektive Lohnverhandlungen, einen starken Sozialstaat mit Umverteilung und die Kopplung von Löhnen an die Produktivität geprägt. In den 1970er-Jahren geriet dieses Modell in die Krise: Die Märkte waren mit normierten Gütern gesättigt, die Ölpreisschocks 1973 und 1979 lösten eine Weltwirtschaftskrise aus, und die Nachfrage differenzierte sich durch die Individualisierung der Lebensstile. Das starre Akkumulationsregime passte nicht mehr. Im Postfordismus wird daher flexibel produziert (CAD/CAM, Lean Production, Just in Time, Outsourcing, Economies of Scope), und die Regulation ist dezentral und marktorientiert: Deregulierung, abnehmende Bedeutung des Staates, Individualisierung der Löhne und Public-Private-Partnerships. Die postfordistische Phase gilt auch als Ära der Globalisierung." },

  { id: "q-scale", kap: "k2", pts: 8, min: 8,
    q: "Erklären Sie Economies of Scale, Economies of Scope und Postponement und zeigen Sie, wie Plattformstrategien beide verbinden.",
    kp: [
      ["Scale: Stückkosten sinken mit der Menge (Fixkostendegression)", 2, ["stückkosten|kostendegression|fixkosten", "menge|größe"]],
      ["Scope: Verbundvorteile durch verschiedene Produkte mit denselben Ressourcen", 2, ["verbund", "verschiedene|vielfalt|unterschiedliche"]],
      ["Postponement: möglichst späte Differenzierung", 2, ["spät|postponement"]],
      ["Plattform: identische Teile in vielen Modellen (Golf-Plattform, MQB, MEB)", 2, ["plattform|baukasten|mqb|meb|golf", "identische|gleiche teile"]]
    ],
    model: "Economies of Scale sind Größenvorteile: Die Stückkosten sinken mit steigender Produktions- oder Transportmenge, weil sich die Fixkosten auf mehr Einheiten verteilen – etwa bei immer größeren Containerschiffen. Economies of Scope sind Verbundvorteile: Kosten sinken, weil verschiedene Produkte mit denselben Anlagen, demselben Know-how oder Vertrieb hergestellt werden. Postponement bedeutet, Produkte möglichst spät zu differenzieren, um lange von Skaleneffekten zu profitieren und trotzdem individuelle Kundenwünsche zu erfüllen. Plattformstrategien verbinden beides: Verschiedene Modelle, auch verschiedener Marken, nutzen möglichst viele identische Teile wie Bodengruppe, Achsen und Motoren – etwa die Golf-V-Plattform in Jetta, Touran und Tiguan oder der Modulare Querbaukasten von VW." },

  { id: "q-gleichpol", kap: "k2", pts: 10, min: 10,
    q: "Wie argumentieren Gleichgewichts- und Polarisationstheoretiker:innen zur Entwicklung von Zentrum und Peripherie?",
    kp: [
      ["Gleichgewicht/Neoklassik: Faktorwanderungen gleichen aus → Konvergenz", 2, ["neoklass|gleichgewicht", "ausgleich|angleich|konvergenz"]],
      ["Argumente: Nachfrage des Zentrums, Arbeit in Peripherie knapp/teurer, Produktion wandert (Flächenknappheit), Multiplikator", 2, ["knapp|teurer", "fläche|verlager", "multiplikator", "nachfrage"]],
      ["Polarisation: Zentrum wächst auf Kosten der Peripherie → Divergenz", 2, ["polaris", "divergenz|verstärk|auseinander|kosten der peripherie"]],
      ["Myrdal: Backwash/Entzugseffekte: Kapital, Fachkräfte, Kaufkraft fließen ab, Brain Drain", 2, ["myrdal", "backwash|entzug", "brain drain|abwander"]],
      ["unelastische Nachfrage nach Peripheriegütern; Nettokapitaltransfer ins Zentrum; Dependenztheorie/Terms of Trade", 2, ["unelastisch", "kapital", "dependenz|terms of trade|prebisch"]]
    ],
    model: "Gleichgewichtstheoretiker:innen in der Tradition der Neoklassik sehen die Beziehung zwischen Zentrum und Peripherie als Ausgleichsprozess: Regionale Unterschiede lösen Wanderungen von Produktionsfaktoren aus, bis die Disparitäten verschwinden (Konvergenz). Die Peripherie wird durch die Nachfrage des Zentrums reicher, durch Abwanderung werden Arbeitskräfte dort knapp und teurer, und wegen der Flächenknappheit im Zentrum entstehen Betriebe in der Peripherie, die über den Multiplikatoreffekt weitere Investitionen anziehen. Polarisationstheoretiker:innen widersprechen: Das Zentrum wächst auf Kosten der Peripherie, die Unterschiede verstärken sich kumulativ (Divergenz). Gunnar Myrdal spricht von Entzugseffekten (Backwash Effects): Der Peripherie werden Kapital, Arbeitskräfte und Dienstleistungen entzogen; vor allem junge, gut ausgebildete Menschen wandern ab (Brain Drain). Zudem werden Peripheriegüter im Zentrum unelastisch nachgefragt, das Einkommen der Peripherie fließt in Güter des Zentrums, und es gibt Nettokapitaltransfers von armen in reiche Regionen. Die Dependenztheorie (Prebisch) sieht die Ursache der Unterentwicklung entsprechend in externen Abhängigkeiten und ungleichen Terms of Trade." },

  { id: "q-zp", kap: "k2", pts: 8, min: 8,
    q: "Beschreiben Sie das Zentrum-Peripherie-Modell und bewerten Sie es empirisch.",
    kp: [
      ["Strukturunterschiede: Zentrum mit Industrie, Diensten, Bevölkerung, Infrastruktur, hohem Einkommen; Peripherie agrarisch, gestreut", 2, ["struktur", "infrastruktur|industrie", "landwirtschaft|agrar"]],
      ["ungleicher Austausch: Rohstoffe, Arbeitskräfte (Brain Drain) ↔ Kapital, Know-how, Fertigprodukte", 2, ["rohstoff", "kapital|know-how|fertigprodukt", "brain drain|arbeitskräfte"]],
      ["Abhängigkeit: Headquarters/Entscheidungen im Zentrum", 2, ["headquarter|zentrale|entscheidung|abhängig"]],
      ["Empirie: gemischt – Südkorea bestätigt; Primatstädte (Peru, Mexiko, Thailand) ohne Ausgleich", 2, ["südkorea|korea", "primat", "gemischt"]]
    ],
    model: "Das Zentrum-Peripherie-Modell unterscheidet zwei Raumtypen. Erstens gibt es Strukturunterschiede: Im Kernraum konzentrieren sich Industrie, Dienstleistungen, Bevölkerung, Infrastruktur und hohe Einkommen, während die Peripherie landwirtschaftlich geprägt ist, eine gestreute Bevölkerung und wenig Infrastruktur hat. Zweitens bestehen ungleiche Austauschbeziehungen: Die Peripherie liefert Rohstoffe und Arbeitskräfte – oft die besten Köpfe (Brain Drain) –, das Zentrum liefert Kapital, Know-how und Fertigprodukte. Drittens gibt es Abhängigkeitsbeziehungen, weil die Headquarters und damit die Entscheidungen im Zentrum liegen. Empirisch ergibt sich ein gemischtes Bild: Südkorea bestätigt das Modell, doch die meisten Entwicklungs- und Schwellenländer haben eine ausgeprägte Primatstadt-Verteilung (z. B. Peru, Mexiko, Thailand), bei der kein Ausgleich zwischen Zentrum und Peripherie in Sicht ist." },

  { id: "q-wallerstein", kap: "k2", pts: 8, min: 8,
    q: "Erläutern Sie die Weltsystemtheorie nach Wallerstein.",
    kp: [
      ["Einteilung in Zentren, Semiperipherien, Peripherien", 2, ["zentr", "semiperipher", "peripher"]],
      ["Funktionen: Zentrum F&E, Finanzen, Hightech; Semiperipherie Standardgüter, Öl; Peripherie Rohstoffe, Textil", 2, ["finanz|f&e|forschung|hightech", "standardgüter|halbfertig", "rohstoff|textil"]],
      ["Nullsummenspiel: Aufstieg der einen = Abstieg der anderen", 2, ["nullsumme", "aufst|abst"]],
      ["Beispiele: Korea/Tiger/China steigen auf, Argentinien droht Abstieg; Osteuropa als Semiperipherie", 2, ["korea|tiger|china", "argentinien", "osteuropa"]]
    ],
    model: "Immanuel Wallerstein ordnet die Welt in Zentren, Semiperipherien und Peripherien. Zentren wie Angloamerika, Westeuropa und der pazifische Raum übernehmen Finanz- und Verwaltungsfunktionen, Forschung und Entwicklung sowie Hochtechnologie. Die Semiperipherie – postkommunistische Reformländer, Schwellenländer und Erdölexporteure – fertigt industrielle Standardgüter und Halbfertigwaren oder liefert Erdöl und Erdgas. Die Peripherie liefert Rohstoffe und arbeitsintensive Güter wie Textilien. Das System ist eine Art Nullsummenspiel: Steigen Peripherien zu Semiperipherien oder Zentren auf, müssen andere absteigen. So stiegen Korea, die anderen ostasiatischen Tiger und jüngst China auf, während Argentinien, das in den 1930ern an der Schwelle zum Zentrum stand, die Peripherisierung droht. Auch die Umbrüche in Osteuropa lassen sich so deuten." },

  { id: "q-integr", kap: "k2", pts: 8, min: 8,
    q: "Beschreiben Sie die Stufen der wirtschaftlichen Integration mit aktuellen Beispielen.",
    kp: [
      ["Freihandelszone: keine Binnenzölle, eigene Außenzölle (EFTA, USMCA, RCEP)", 2, ["freihandel", "binnenzöll|keine zölle", "efta|usmca|nafta|rcep"]],
      ["Zollunion: gemeinsamer Außenzoll (Mercosur, EU–Türkei)", 2, ["zollunion", "außenzoll|gemeinsame.{0,10}zoll", "mercosur|türkei"]],
      ["Binnenmarkt: vier Freiheiten (EG 1993)", 1, ["binnenmarkt|gemeinsamer markt", "freiheiten|1993"]],
      ["Wirtschaftsunion: harmonisierte Politik, supranational (EU)", 1, ["wirtschaftsunion", "harmonis|supranational"]],
      ["Währungsunion: gemeinsame Währung (Euro, 21 Staaten seit 2026)", 1, ["währungsunion|euro"]],
      ["Politische Union: gemeinsame Außen-/Verteidigungspolitik (diskutiert); Stufen bauen aufeinander auf", 1, ["politische union", "außenpolitik|verteidigung"]]
    ],
    model: "Die wirtschaftliche Integration verläuft in Stufen, wobei jede Stufe alle Merkmale der vorherigen enthält. Die lockerste Form ist die ökonomische Zusammenarbeit zur Förderung der Entwicklung (z. B. APEC, ASEAN). In einer Freihandelszone gibt es keine Zölle zwischen den Mitgliedern, aber jedes Land behält seine eigenen Außenzölle (z. B. EFTA, USMCA als Nachfolger der NAFTA, RCEP). Eine Zollunion hat zusätzlich einen gemeinsamen Außenzoll (z. B. Mercosur, EU–Türkei seit 1996). Im Binnenmarkt kommen die vier Freiheiten hinzu, wie sie die EG 1993 verwirklichte. Eine Wirtschaftsunion harmonisiert zusätzlich die Wirtschaftspolitik mit supranationalen Institutionen, deren Recht nationales Recht ablöst – das ist die EU. Die Wirtschafts- und Währungsunion hat eine gemeinsame Währung, den Euro, den seit 2026 21 Staaten nutzen. Die politische Union mit gemeinsamer Außen- und Verteidigungspolitik wird für die EU diskutiert." },

  { id: "q-krugman", kap: "k2", pts: 10, min: 10,
    q: "Erklären Sie Krugmans „New Economic Geography“: Wie entstehen Ballungsräume und wovon hängt die Ballung ab?",
    kp: [
      ["Krugman, Nobelpreis 2008, NÖG 1991: Neoklassik + Raum", 1, ["krugman", "2008|nobel|1991"]],
      ["Annahmen: steigende Skalenerträge, mobile Faktoren, Transportkosten", 3, ["skalenertr", "mobil", "transportkosten"]],
      ["Produktion an einem Standort; Beschäftigte als Kund:innen → Nachfrage → weitere Firmen → kumulative Ballung", 2, ["einem standort|ein standort", "nachfrage|kund", "kumulativ|kreislauf|selbstverstärk"]],
      ["Ballung am stärksten bei mittleren Transportkosten", 2, ["mittler"]],
      ["zentripetale vs. zentrifugale Kräfte; Spezialisierung durch Arbeitskräftepool, Zulieferer, Spillovers", 2, ["zentripetal|zentrifugal", "spillover|zulieferer|arbeitskräfte"]]
    ],
    model: "Paul Krugman, Wirtschaftsnobelpreisträger 2008, begründete 1991 die New Economic Geography, die die neoklassischen Modelle um den Raum ergänzt. Sie geht von steigenden Skalenerträgen, mobilen Produktionsfaktoren und Transportkosten als zentralem Element aus. Wegen der Skalenerträge konzentriert jedes Unternehmen seine Produktion an einem Standort. Weil die Beschäftigten zugleich Kund:innen sind, ist die Nachfrage dort am größten, wo viele Unternehmen sitzen; das zieht weitere Unternehmen, Zulieferer und Fachkräfte an, Wissen schwappt über, und es entsteht eine kumulative Ballung. Die Ballung ist umso stärker, je höher die Skalenerträge und je weniger eine Industrie an Rohstoffe gebunden ist. Sie ist bei mittleren Transportkosten am größten, weil sich dann entfernte Märkte vom Zentrum aus profitabel beliefern lassen; bei sehr hohen oder sehr niedrigen Transportkosten verteilen sich die Standorte. Ob eine Region Zentrum oder Peripherie wird, hängt davon ab, ob die zentripetalen Kräfte (Nachfrage- und Absatzbeziehungen, Spillovers) die zentrifugalen (Transportkosten, steigende Boden- und Lohnkosten, Wettbewerb) überwiegen." },

  { id: "q-christ", kap: "k2", pts: 10, min: 10,
    q: "Erklären Sie die Theorie der zentralen Orte nach Christaller (Begriffe, Sechseckmuster, K-Werte, Bewertung).",
    kp: [
      ["Christaller 1933, zentrale Orte versorgen Umland mit zentralen Gütern; Hierarchie", 2, ["1933|christaller", "zentrale.{0,10}(orte|güter)", "hierarch"]],
      ["Reichweite (obere Grenze) und Schwelle (Mindestumsatz)", 2, ["reichweite", "schwelle|mindest"]],
      ["Kreise → Lücken/Überlappung → Sechsecke", 2, ["sechseck|hexagon", "kreis"]],
      ["K = 3 Versorgung, K = 4 Verkehr, K = 7 Verwaltung", 2, ["k ?= ?3|k3|versorgungsprinzip", "k ?= ?4|verkehrsprinzip", "k ?= ?7|verwaltungsprinzip"]],
      ["Bewertung: Hierarchie bestätigt, Gebiete unregelmäßig; Raumplanung (Ober-/Mittel-/Unterzentren); Widersprüche (Suburbanisierung, Parndorf)", 2, ["raumplanung|oberzentrum|mittelzentrum", "unregelmäßig|suburban|parndorf|outlet"]]
    ],
    model: "Walter Christaller untersuchte 1933, ob es Gesetzmäßigkeiten in Verteilung, Größe und Anzahl der Städte gibt. Zentrale Orte sind Siedlungen, die ihr Umland mit zentralen Gütern und Dienstleistungen versorgen; Orte höherer Ordnung bieten höherwertige Güter an, sodass eine Hierarchie entsteht – vom Dorf mit Lebensmittelgeschäft bis Wien mit Ministerien und Staatsoper. Jedes Gut hat eine Reichweite: die obere Grenze ist die maximale Entfernung, die Kund:innen zurücklegen, die untere Grenze (Schwelle) das Mindestgebiet für einen rentablen Umsatz. Bei gleichen Verkehrsbedingungen in alle Richtungen wären die Marktgebiete Kreise; da Kreise Lücken lassen oder sich überlappen, entsteht ein lückenloses Sechsecknetz. Der K-Wert gibt an, wie viele Orte der nächstniedrigeren Stufe ein Zentrum inklusive sich selbst versorgt: K = 3 nach dem Versorgungsprinzip, K = 4 nach dem Verkehrsprinzip und K = 7 nach dem Verwaltungsprinzip. Empirisch bestätigt ist eine klare Hierarchie der Städte, die Einzugsbereiche sind aber unregelmäßiger als vorhergesagt. In der Raumplanung ist die Gliederung in Ober-, Mittel- und Unterzentren seit den 1960er-Jahren Standard. Suburbanisierung oder Einrichtungen wie das Designer Outlet Parndorf, die der Verkehrsanbindung folgen, widersprechen dem Modell." },

  { id: "q-haeger", kap: "k2", pts: 10, min: 10,
    q: "Erklären Sie das Hägerstrand-Modell: Formen der Diffusion und die Ausbreitung von Innovationen.",
    kp: [
      ["Expansionsdiffusion (bleibt am Ursprung, breitet sich aus; Grippe)", 2, ["expansion", "grippe|epidemie|ursprung"]],
      ["Relokationsdiffusion (verlässt Ursprung; Great Migration) und kombinierte Form", 2, ["relokation|verlagerung", "migration|wanderung", "kombin"]],
      ["persönliche Kontakte, mittleres Informationsfeld, Distanzabnahme", 2, ["persönlich", "informationsfeld", "distanz|entfernung"]],
      ["hierarchische Diffusion (Beatles: Liverpool → London → Weltstädte) und Wellenmodell", 2, ["hierarch", "welle|scheitel"]],
      ["Monte-Carlo-Simulation; Adoptionstypen (Pionier … Laggard); Barrieren", 2, ["monte|simulation", "pionier|adopter|laggard|adoption", "barriere"]]
    ],
    model: "Torsten Hägerstrand untersuchte die räumlich-zeitliche Ausbreitung von Phänomenen. Er unterscheidet drei Formen der Diffusion: Bei der Expansionsdiffusion bleiben die Informationseinheiten im Ursprungsgebiet und breiten sich zusätzlich aus, etwa bei einer Grippeepidemie. Bei der Relokationsdiffusion verlassen sie das Ursprungsgebiet und tauchen anderswo auf, etwa bei der Great Migration der afroamerikanischen Bevölkerung in die Industriestädte des Nordens. Am häufigsten ist eine Kombination beider Formen. Innovationen verbreiten sich vor allem über persönliche Kontakte, weil man sich selbst von ihrer Tauglichkeit überzeugen will; im mittleren Informationsfeld, dem engsten Kontaktkreis, ist die Übernahme am wahrscheinlichsten, und Kontakte nehmen mit der Distanz stark ab. Häufig verläuft die Ausbreitung hierarchisch entlang der Städtehierarchie, wie bei den Beatles von Liverpool über London in die Weltstädte bis ins letzte Dorf. Jede Innovation breitet sich als Welle aus, deren Scheitel nach außen wandert und flacher wird. Hägerstrand simulierte das mit einer Monte-Carlo-Simulation. Nach Heuss lassen sich Adoptionstypen vom Pionier über den spontan imitierenden und den unter Druck reagierenden bis zum unbeweglichen Akteur unterscheiden; Diffusionsbarrieren sind heute vor allem sprachlich und kulturell." },

  { id: "q-dmt", kap: "k2", pts: 8, min: 8,
    q: "Erklären Sie den Demografischen Übergang und warum die Bevölkerung im Globalen Süden stärker wächst als einst in Europa.",
    kp: [
      ["Geburten- und Sterberate werden gegenübergestellt; Bezug zur Wirtschaftsentwicklung", 1, ["geburtenrate", "sterberate"]],
      ["Phasen: 1 beide hoch, 2 SR sinkt (Wachstum), 3 GR sinkt, 4 beide niedrig (5: Schrumpfung)", 3, ["phase", "sinkt", "wachstum|wächst"]],
      ["Süden in Phase 2/3; Medizin kam „mit einer Schiffsladung“ – SR fiel schnell", 2, ["schiffsladung|schnell|rasch|plötzlich", "medizin|hygiene"]],
      ["GR bleibt hoch (Kinder als Arbeitskräfte/Altersvorsorge); Europa ~200 Jahre", 2, ["arbeitskräfte|altersvorsorge", "200|zwei jahrhunderte"]]
    ],
    model: "Der Demografische Übergang stellt Geburten- und Sterberate gegenüber und verbindet sie mit dem Übergang von der Agrar- zur Industrie- und Dienstleistungsgesellschaft. In Phase 1 sind beide Raten hoch und die Bevölkerung stagniert. In Phase 2 sinkt die Sterberate durch bessere medizinisch-hygienische Versorgung, während die Geburtenrate hoch bleibt – die Bevölkerung wächst stark. In Phase 3 sinkt auch die Geburtenrate, und in Phase 4 pendeln sich beide auf niedrigem Niveau ein; manche Lehrbücher ergänzen eine Phase 5 mit schrumpfender Bevölkerung. Die meisten Länder des Globalen Südens befinden sich in Phase 2 oder 3. Ihr Wachstum ist stärker als einst in Europa, weil das medizinische Instrumentarium gleichsam „mit einer Schiffsladung“ kam: Die Sterberate fiel innerhalb weniger Jahrzehnte, während die Geburtenrate hoch blieb, da Kinder als Arbeitskräfte und Altersvorsorge dienen. In Europa dauerte derselbe Prozess rund 200 Jahre." },

  /* ---------- Kapitel 3 ---------- */
  { id: "q-fdi", kap: "k3", pts: 8, min: 8,
    q: "Was sind ausländische Direktinvestitionen, warum haben sie seit den 1980er-Jahren so stark zugenommen und warum sind sie ein Indikator der Globalisierung?",
    kp: [
      ["Definition: langfristige Investition mit dauerhaftem Einfluss (Eigenkapital, reinvestierte Gewinne, konzerninterne Kredite)", 3, ["langfristig|dauerhaft", "einfluss|kontrolle", "eigenkapital|reinvest|kredit"]],
      ["Gründe: Liberalisierung der Kapitalmärkte, Abbau von Hemmnissen, billige Kommunikation/Transporte, Kaufkraft", 3, ["liberalis", "hemmnis|abbau", "kommunikation|transport", "kaufkraft"]],
      ["Indikator: wachsen schneller als Handel und BIP; 30 % intrafirm trade; Struktur → Dienstleistungen", 2, ["schneller", "intrafirm|konzernintern|30 ?%", "dienstleistung"]]
    ],
    model: "Eine ausländische Direktinvestition ist laut UNCTAD eine langfristige Investition, mit der ein Investor aus einem Land dauerhaft maßgeblichen Einfluss auf ein Unternehmen in einem anderen Land ausübt; sie besteht aus Eigenkapital, reinvestierten Gewinnen und konzerninternen Krediten und unterscheidet sich damit von reinen Portfolioinvestitionen. Seit den 1980er-Jahren haben die Direktinvestitionen stark zugenommen, weil die Kapitalmärkte liberalisiert und Investitionshemmnisse abgebaut wurden, weil Kommunikation und Transport billiger wurden und weil die Kaufkraft in vielen Ländern stieg. Sie sind ein guter Indikator der Globalisierung, da sie dynamischer gewachsen sind als der Warenhandel, der wiederum schneller wuchs als das Welt-BIP; zudem findet rund 30 % des Welthandels konzernintern statt, und ihre Struktur verschob sich von Rohstoffen zu Dienstleistungen." },

  { id: "q-verkehrstraeger", kap: "k3", pts: 8, min: 8,
    q: "Vergleichen Sie die Kostenstruktur von Lkw, Bahn und Schiff und erklären Sie, warum externe Kosten eine Maut rechtfertigen.",
    kp: [
      ["Kosten = Fixkosten + distanzabhängige variable Kosten; Kosten je km sinken mit Distanz", 2, ["fixkosten", "variabl"]],
      ["Lkw: geringe Fixkosten → kurze Distanzen; Bahn ab ca. 300 km; Schiff: höchste Vorleistungen → lange Distanzen", 3, ["lkw", "300", "schiff|see"]],
      ["Bahn Vor-/Nachteile (umweltfreundlich, sicher vs. unflexibel, Lärm)", 1, ["umweltfreundlich|sicher", "flexib|lärm"]],
      ["externe Kosten trägt Allgemeinheit (Binnenschiff 10, Bahn 15, Straße 35 €/1.000 tkm) → Maut für Kostenwahrheit/Internalisierung", 2, ["extern", "maut|internalis|kostenwahrheit", "35|allgemeinheit"]]
    ],
    model: "Die Transportkosten bestehen aus Fixkosten und distanzabhängigen variablen Kosten; bei allen Verkehrsträgern sinken die Kosten je Kilometer mit der Distanz, aber das Verhältnis ist unterschiedlich. Der Lkw hat geringe Fixkosten und ist daher auf kurzen Distanzen am günstigsten. Die Bahn wird wegen ihrer hohen Fixkosten für Infrastruktur und Umschlag erst ab etwa 300 km günstiger; sie ist umweltfreundlich, sicher und für große Tonnagen geeignet, aber zeitlich und räumlich weniger flexibel. Die Seeschifffahrt hat die höchsten Vorleistungen für Schiffe und Häfen und ist daher auf großen Distanzen am billigsten. Ein Teil der Kosten wird jedoch nicht vom Verursacher, sondern von der Allgemeinheit getragen: Umwelt-, Lärm-, Unfall- und Infrastrukturkosten. Schätzungen zufolge verursacht die Straße mit rund 35 € je 1.000 tkm deutlich mehr externe Kosten als Bahn (15 €) und Binnenschiff (10 €). Eine Maut soll diese Kosten dem Verursacher anlasten (Internalisierung) und mehr Kostenwahrheit gegenüber der Bahn herstellen." },

  { id: "q-seefracht", kap: "k3", pts: 12, min: 12,
    q: "Erläutern Sie die Bedeutung der Seefracht für den Welthandel: Container, Schiffsgrößen, Häfen und Frachtraten als Indikator.",
    kp: [
      ["über 80 % des Welthandels (Volumen) per Schiff; wichtigster Verkehrsträger", 2, ["80", "wichtigst"]],
      ["Container: standardisiert, intermodal, Bündelung; TEU", 2, ["container", "intermodal|umschlag|standard", "teu"]],
      ["Economies of Scale: Schiffe > 20.000 TEU (MSC Irina 24.300), Kosten je Slot sinken, Distanz tritt zurück", 2, ["scale|skalen|größer", "20\\.?000|24\\.?300|irina", "slot|stellplatz"]],
      ["Kehrseite: Hafenkosten steigen, Hinterland-Engpass in Europa, Reedereien in Häfen; größte Häfen in Asien", 2, ["hafenkosten|häfen", "hinterland", "asien|shanghai"]],
      ["Frachtraten/BDI als Konjunkturindikator (Frühindikator)", 2, ["frachtrat|baltic|bdi", "indikator|konjunktur|seismograf"]],
      ["Beispiele: 2008 1.500 → 300 USD; 2021 bis 20.000 USD; 2024 Rotes Meer; 2026 Kap-Route", 2, ["300", "20\\.?000|2021", "rote.{0,3} meer|huthi|kap|suez"]]
    ],
    model: "Die Seeschifffahrt ist mit Abstand der wichtigste Verkehrsträger im Welthandel: Über 80 % des Welthandels nach Volumen werden per Schiff transportiert. Gründe sind die Internationalisierung der Produktion und die Economies of Scale, mit denen sich große Mengen über große Entfernungen billig befördern lassen. Besonders der Containerverkehr wuchs stark, weil standardisierte Container verschiedene Güter bündeln und sich problemlos zwischen Schiff, Bahn und Lkw umschlagen lassen; die Kapazität wird in TEU gemessen. Die größten Schiffe fassen heute über 20.000 TEU, 2024 die MSC Irina rund 24.300 TEU. Dadurch sinken die Kosten je Stellplatz, und die Distanz tritt gegenüber Auslastung, Umschlag sowie Vor- und Nachlauf in den Hintergrund. Allerdings steigen die Hafenkosten für tiefere Becken, längere Kais und größere Kräne, und in Europa hält der Ausbau des Hinterlandverkehrs nicht Schritt; deshalb investieren Großreedereien in Häfen. Die größten Häfen liegen in Asien, allen voran Shanghai mit über 50 Mio. TEU. Frachtraten und der Baltic Dry Index gelten als Seismografen der Weltkonjunktur: In der Krise 2008 fiel der Preis für einen Container China–Europa von 1.500 auf 300 USD, 2021 stieg er wegen der Covid-Störungen auf bis zu 20.000 USD für einen 40-Fuß-Container, 2024 erneut wegen der Huthi-Angriffe im Roten Meer, und 2026 zwingt der Iran-Krieg die Schiffe auf die längere Route um das Kap der Guten Hoffnung." },

  { id: "q-bdi", kap: "k3", pts: 6, min: 6,
    q: "Warum gilt der Baltic Dry Index als Frühindikator der Weltkonjunktur?",
    kp: [
      ["misst Charterraten für Massengutfrachter (Kohle, Erz, Getreide), täglich in London", 2, ["charter|frachtrat", "massengut|kohle|erz|getreide"]],
      ["Rohstoffe stehen am Anfang der Produktion → kündigen Industrieproduktion an", 2, ["anfang|vor der produktion|rohstoff", "produktion"]],
      ["Schiffsangebot kurzfristig unelastisch → Raten reagieren stark", 2, ["angebot|kapazität", "kurzfristig|stark|unelastisch"]]
    ],
    model: "Der Baltic Dry Index wird täglich in London ermittelt und misst die Charterraten für Massengutfrachter, die Rohstoffe wie Kohle, Erz und Getreide transportieren. Da Rohstoffe am Anfang der Produktionskette stehen, kündigt eine steigende Nachfrage nach Schiffsraum eine steigende Industrieproduktion an, eine sinkende dagegen einen Abschwung. Weil das Angebot an Schiffen kurzfristig kaum veränderbar ist, reagieren die Raten sehr stark auf Nachfrageänderungen. Deshalb gilt der Index als Frühindikator der Weltkonjunktur." },

  { id: "q-covid", kap: "k3", pts: 12, min: 12,
    q: "Was hat Politik mit Logistik und Wirtschaft zu tun? Erklären Sie dies am Beispiel der Covid-Krise und der Krisen danach.",
    kp: [
      ["Einbruch 2020: OECD-BIP Q2 −9,8 % (Finanzkrise −2,3 %); Handel, Bahn/Häfen −20 %, Luftverkehr am stärksten", 2, ["9,8|-9|einbruch|schrumpf", "luftverkehr|flug", "20 ?%"]],
      ["politische Maßnahmen: Lockdowns, Reisebeschränkungen, Chinas Null-Covid (Häfen/Fabriken geschlossen)", 3, ["lockdown|reisebeschränk|maßnahme", "null-covid|zero|china", "häfen|fabrik|schließ"]],
      ["2021: Fahrpläne kollabieren, Staus vor Häfen, Rekordpreise 13.000–20.000 USD; Problem = Gleichzeitigkeit", 2, ["stau|verspät|fahrplan", "20\\.?000|13\\.?000|zehnfach|rekord", "gleichzeitig"]],
      ["Bullwhip-Effekt: Überbestellung, Lagerhaltung statt schlanker Bestände", 2, ["bullwhip|peitsche", "lager|bestell"]],
      ["weitere Politik: Ukraine-Krieg (Energie, Sanktionen), Rotes Meer 2024, Iran-Krieg 2026, Zölle", 2, ["ukraine|sanktion|energie", "rote.{0,3} meer|huthi|iran|hormus|zölle"]],
      ["Folge: höhere Logistikkosten → Preise/Inflation für Konsument:innen", 1, ["preis|inflation|konsument|kosten"]]
    ],
    model: "Die Covid-Krise zeigt, wie stark politische Entscheidungen Logistik und Wirtschaft beeinflussen. Lockdowns und weltweite Reisebeschränkungen ließen die Wirtschaftsleistung der OECD-Länder im zweiten Quartal 2020 um 9,8 % schrumpfen – weit mehr als in der Finanzkrise (−2,3 %). Bahngüterverkehr und Containerumschlag gingen um rund 20 % zurück, am stärksten traf es den Luftverkehr. Chinas Null-Covid-Politik mit geschlossenen Fabriken, Vertriebsstätten und Häfen störte die Lieferketten zusätzlich. Im Herbst 2021 konnten kaum noch Liniendienste ihren Fahrplan halten, vor den Häfen stauten sich Schiffe, und die Preise für einen 40-Fuß-Container von China nach Europa stiegen auf 13.000 bis 20.000 USD, etwa das Zehnfache des Vor-Covid-Niveaus. Das Problem war weniger die Menge als die Gleichzeitigkeit der Nachfrage, weil alle Händler aus Angst vor Engpässen gleichzeitig bestellten. Im Sinne des Bullwhip-Effekts schaukelten sich diese Bestellungen auf, und Unternehmen gingen vom Prinzip schlanker Lager ab. Auch danach prägte die Politik die Logistik: Der Ukraine-Krieg 2022 und die Sanktionen machten Energie zum größten Kostentreiber, die Huthi-Angriffe im Roten Meer 2024 und der Iran-Krieg 2026 zwangen Schiffe auf den Umweg um Afrika, und Zölle verändern Handelsströme. Am Ende tragen die Konsument:innen die höheren Logistikkosten in Form steigender Preise." },

  { id: "q-digital", kap: "k3", pts: 8, min: 8,
    q: "Wie verändert die Digitalisierung als Wirtschaftstrend Logistik und Transportwirtschaft?",
    kp: [
      ["Begriff: Industrie 4.0, IoT, 5G, KI", 1, ["industrie 4\\.0|iot|internet der dinge|internet of things|5g|ki|künstliche"]],
      ["Standortverlagerungen; Dezentralisierung, 3D-Druck ersetzt/schafft Transporte", 2, ["3d", "dezentral|verlager"]],
      ["Losgröße 1 → mehr, kleinere Sendungen → Bündelung, KEP wächst", 2, ["losgröße|individualis", "kep|paket|kleinere"]],
      ["engere Integration: verlängerte Werkbank", 1, ["werkbank|integration"]],
      ["autonomes Fahren, Robotik → Konsolidierung (Generalisten/Spezialisten); Jobs fallen weg, IT-Jobs entstehen", 2, ["autonom|robot", "konsolid|generalist|spezialist", "arbeitsplätze|jobs|beschäftigung"]]
    ],
    model: "Digitalisierung bezeichnet den Umstieg von analogen auf digitale Prozesse und wird unter Schlagworten wie Industrie 4.0, Internet der Dinge, 5G oder Künstliche Intelligenz diskutiert. Sie verändert die Produktion und damit die Logistik: Optimierte Produktionsprozesse können Industriestandorte verlagern, und digitalisierte Produktion ermöglicht Dezentralisierung – 3D-Druck ersetzt klassische Produkttransporte, schafft aber neue Transporte für die Druckrohstoffe. Individualisierte Produkte bis zur Losgröße 1 führen zu mehr, aber kleineren Sendungen, wodurch der Bedarf an Bündelung steigt und Kurier-, Express- und Paketdienste stark wachsen. Transportunternehmen werden enger mit der Industrie verzahnt und zur „verlängerten Werkbank“. Autonomes Fahren und Robotik verändern Geschäftsmodelle und führen zu einer Konsolidierung der Branche mit großen Generalisten und kleinen Spezialanbietern. Schließlich fallen gering qualifizierte Tätigkeiten weg, während neue Arbeitsplätze in IT-Entwicklung und Kontrolle entstehen." },

  /* ---------- Kapitel 4 ---------- */
  { id: "q-europa-zp", kap: "k4", pts: 10, min: 10,
    q: "Beschreiben Sie Zentrum-Peripherie-Strukturen in Europa und wie die EU darauf reagiert.",
    kp: [
      ["Disparitäten trotz „Insel des Wohlstands“; Messung BIP/Kopf in KKS auf NUTS-2", 2, ["kaufkraft|kks", "nuts|bip"]],
      ["Spannweite: Inner London 343 % vs. Bulgarien 28 % (2008); Prag Spitze der Neuen", 2, ["london", "bulgarien", "343|28"]],
      ["Bevölkerungsdichte (Randstad > 500 vs. < 50), Arbeitslosigkeit bis 30 % (Andalusien)", 2, ["randstad|dichte", "arbeitslos|andalusien"]],
      ["Gefälle: GB Süd–Nord, Italien Nord–Süd, D Ost–West; Peripherie im Süden; Rangstellung statt Lage", 2, ["süd|nord", "griechenland|portugal|spanien|italien", "rangstellung|nicht.{0,20}lage"]],
      ["Kohäsionspolitik mit Struktur- und Kohäsionsfonds; alte Industriegebiete monostrukturell vs. diversifiziert", 2, ["kohäsion|strukturfonds", "monostruktur|diversifiz|altindustr|ruhr"]]
    ],
    model: "Von außen wirkt Europa wie eine Insel des Wohlstands, im Inneren gibt es aber große regionale Disparitäten. Gemessen wird die Wirtschaftskraft als BIP pro Kopf in Kaufkraftstandards auf NUTS-2-Ebene, weil KKS Preisunterschiede zwischen den Ländern ausgleichen. 2008 reichte die Spanne von 28 % des EU-Durchschnitts in Teilen Bulgariens bis 343 % in Inner London; Prag lag als Spitzenreiter der neuen Mitgliedstaaten bei 173 %. Auch die Bevölkerung ist ungleich verteilt: Im Kern, etwa in der Randstad Holland, leben über 500 Menschen pro km², in vielen Peripherien unter 50. Die Arbeitslosigkeit reichte von Vollbeschäftigung in den Zentren bis zu 30 % in Peripherien wie Andalusien. National gibt es Gefälle, etwa von Süd nach Nord in Großbritannien und von Nord nach Süd in Italien; im Makromaßstab liegt die Peripherie im Süden. Zentral und peripher unterscheiden sich dabei weniger durch die Lage als durch die wirtschaftliche Rangstellung. Besonders krisenanfällig sind alte, monostrukturelle Industriegebiete wie das Ruhrgebiet oder die Mur-Mürz-Furche, während diversifizierte Regionen wie das Wiener Becken bessere Chancen haben. Die EU hat sich die Kohäsion als zentrale Aufgabe gesetzt und versucht, die Unterschiede mit der Kohäsionspolitik über Struktur- und Kohäsionsfonds zu verringern." },

  { id: "q-banane", kap: "k4", pts: 6, min: 6,
    q: "Geben Sie einen Überblick über die Raumstrukturmodelle Europas (Blaue Banane und Alternativen).",
    kp: [
      ["Blaue Banane: Südengland – Rhein – Lombardei (London–Mailand), Brunet/DATAR 1989", 2, ["blaue banane", "london|südengland", "mailand|lombardei|norditalien"]],
      ["Kritik: Paris, Hamburg, Berlin fehlen, Osteuropa fehlt → Blauer Stern, Blaue Banane 2 (Stockholm–Wien–Belgrad)", 2, ["blauer stern|blaue banane 2|stockholm|belgrad", "paris|kritik"]],
      ["Sunbelt (Mittelmeer Barcelona–Genua) und Pentagon (London–Paris–Mailand–München–Hamburg)", 2, ["sunbelt|mittelmeer", "pentagon"]]
    ],
    model: "Das bekannteste Raumstrukturmodell ist die Blaue Banane, die Roger Brunet 1989 im Auftrag der DATAR formulierte: ein Wachstumsband von Südengland über die Rhein-Rhône-Linie bis in die Lombardei, also von London bis Mailand, mit hoher Bevölkerungs- und Wirtschaftsdichte. Kritisiert wird, dass Paris, Hamburg und Berlin herausfallen und Osteuropa fehlt. Daher gibt es Alternativen wie den „Blauen Stern“ und die „Blaue Banane 2“ von Stockholm über Berlin, Prag und Wien bis Belgrad, durch die Wien vom Rand in die Mitte rückt. Der Sunbelt entlang der Mittelmeerküste von Barcelona bis Genua gilt als weitere Wachstumszone, und in der Raumplanung hat sich das Pentagon London–Paris–Mailand–München–Hamburg durchgesetzt, wo auf rund 15 % der Fläche die Hälfte des BIP entsteht." },

  { id: "q-plz", kap: "k4", pts: 8, min: 8,
    q: "Was besagt die Theorie des Produktlebenszyklus für die Standortwahl, und welche Folgen hat das für Zentrum und Peripherie?",
    kp: [
      ["Vernon 1966: Phasen Einführung, Wachstum, Reife, Schrumpfung; Standortfaktoren ändern sich", 2, ["vernon|einführung", "reife", "schrumpf|wachstum"]],
      ["Einführung: zentrale Standorte (F&E, Fachkräfte, Hochschulen)", 2, ["zentral", "f&e|forschung|fachkräfte|hochschul"]],
      ["Reife: Standardisierung, Kostendruck → Peripherie/Niedriglohnländer", 2, ["peripher|niedriglohn|billiglohn", "kosten|standardis"]],
      ["Folge: Gefahr nur bei reifen Produkten; kein Vorsprung ewig (Rust Belt vs. Tiger, MOE)", 2, ["rust belt|tiger|vorsprung|osteuropa|moe"]]
    ],
    model: "Nach der Theorie des Produktlebenszyklus von Raymond Vernon (1966) durchläuft ein Produkt die Phasen Einführung, Wachstum, Reife und Schrumpfung, und mit jeder Phase ändern sich die Standortfaktoren. In der forschungs- und entwicklungsintensiven Einführungsphase sind zentrale Standorte mit Hochschulen, Fachkräften und Fühlungsvorteilen wichtig. Im Wachstum wird die Serienfertigung ausgebaut. In der Reifephase ist das Produkt standardisiert, es zählen vor allem die Kosten, und die Produktion wandert in periphere Niedriglohnregionen; in der Schrumpfung wird sie verlagert oder aufgegeben. Für die Zentren sind Peripherien daher nur bei reifen Produkten eine Gefahr, solange sie ihren Entwicklungsvorsprung halten – doch kein Vorsprung währt ewig, wie der Abstieg der Rust Belts und der Aufstieg der ostasiatischen Tiger zeigen." },

  { id: "q-cluster", kap: "k4", pts: 10, min: 10,
    q: "Was ist ein Cluster? Nennen und erklären Sie die drei Mechanismen der Clusterbildung und die Standortfaktoren der New Economy.",
    kp: [
      ["Definition Porter (1990): geografische Konzentration verbundener Unternehmen und Institutionen in einem Wertschöpfungsbereich", 2, ["porter", "geografische konzentration|räumlich|regional", "verbunden|netzwerk"]],
      ["Labour Market Pooling", 2, ["labour|arbeitsmarkt|fachkräfte"]],
      ["Input-Output-Vorteile (spezialisierte Zulieferer)", 2, ["input|zulieferer"]],
      ["technologische Externalitäten/Spillovers; Tacit Knowledge", 2, ["externalit|spillover|tacit|implizit"]],
      ["New-Economy-Faktoren: Venture Capital/Förderung, Nähe/Cluster, qualifizierte Arbeitskräfte, Lebensqualität, Internet/Erreichbarkeit", 2, ["venture|risikokapital|kapital", "lebensqualität", "qualifiz|universit"]]
    ],
    model: "Ein Cluster ist nach Michael Porter (1990) eine geografische Konzentration von miteinander verbundenen Unternehmen und Institutionen in einem bestimmten Wertschöpfungsbereich, also ein regionales Netzwerk aus Unternehmen, Zulieferern, Abnehmern, Hochschulen, Ausbildungseinrichtungen, spezialisierten Dienstleistern, Kapitalgebern und Politik. Drei Mechanismen treiben die Clusterbildung: Erstens Arbeitsmarktvorteile (Labour Market Pooling) – es entsteht ein Pool spezialisierter Fachkräfte, von dem Unternehmen und Beschäftigte profitieren, und Wissen wandert mit den mobilen Arbeitskräften. Zweitens Input-Output-Vorteile – spezialisierte Zulieferer siedeln sich an, Unternehmen können sich spezialisieren und Skaleneffekte nutzen. Drittens technologische Externalitäten – Unternehmen lernen voneinander, und Wissen lässt sich kaum geheim halten. Dass es trotz Internet zur Ballung kommt, liegt am Tacit Knowledge, das am besten persönlich weitergegeben wird. Für Unternehmen der New Economy sind darüber hinaus Risikokapital und Förderungen, die Nähe zu Universitäten und qualifizierten Arbeitskräften, gute Erreichbarkeit und Internetanbindung sowie Lebensqualität entscheidende Standortfaktoren." },

  { id: "q-silicon", kap: "k4", pts: 8, min: 8,
    q: "Welche Faktoren machten das Silicon Valley zum Prototyp eines Hightech-Clusters?",
    kp: [
      ["Stanford/Berkeley, Prof. Terman, Stanford Industrial Park", 2, ["stanford|berkeley", "terman|industrial park"]],
      ["Pioniere (HP, Shockley), Fairchild 1957 → Spin-offs („Fairchildren“, Intel)", 2, ["fairchild|spin", "intel|hp|hewlett|shockley"]],
      ["Rüstungs- und Raumfahrtaufträge (50–70 %)", 1, ["rüstung|militär|raumfahrt"]],
      ["hohe Mobilität der Fachkräfte (2 Jahre), Wissensaustausch, Tacit Knowledge", 1, ["mobil|zwei jahre|wissensaustausch|tacit"]],
      ["regionales Venture Capital – sich selbst reproduzierendes Finanzierungssystem", 2, ["venture|risikokapital"]]
    ],
    model: "Das Silicon Valley entstand eher zufällig im Umfeld der Stanford University. Professor Frederick Terman ermutigte Studierende zur Gründung eigener Unternehmen, und der Stanford Industrial Park bot ab 1955 günstige Flächen und Zugang zu Know-how. Pioniere wie William Shockley sowie Hewlett und Packard, deren Firma durch Rüstungsaufträge rasch wuchs, legten den Grundstein. 1957 gründeten acht Ingenieure Fairchild Semiconductor, aus dem zahlreiche Spin-offs hervorgingen – die „Fairchildren“, darunter Intel. Die Rüstungs- und Raumfahrtindustrie stellte bis in die 1970er-Jahre 50 bis 70 % der Aufträge. Die Universitäten Stanford und Berkeley lieferten spezialisiertes Humankapital, und die hohe Mobilität der Fachkräfte (Jobs dauerten im Schnitt zwei Jahre) sorgte für regen Wissensaustausch. Entscheidend war schließlich das regionale Venture Capital: Erfolgreiche Unternehmer der ersten Generation finanzierten die nächsten, sodass ein sich selbst reproduzierendes Finanzierungssystem entstand." },

  { id: "q-infra", kap: "k4", pts: 6, min: 6,
    q: "Welche Rolle spielt die Verkehrsinfrastruktur als Standortfaktor – und welche Position hat Österreich?",
    kp: [
      ["notwendig, aber nicht hinreichend; zählt erst in der zweiten Auswahlstufe", 2, ["notwendig", "hinreichend|zweite"]],
      ["primäre Kriterien: Marktnähe, Investitionsrisiko, Steuern, Rechtssicherheit, Humanressourcen, Kosten", 2, ["markt", "steuer|recht|risiko|kosten"]],
      ["Österreich: Hub für MOE (Flughafen Wien 35 MOE-Ziele), LPI 4,0; TEN-V-Korridore", 2, ["hub|drehscheibe", "flughafen|35|lpi|4,0|ten"]]
    ],
    model: "Standortentscheidungen werden vor allem nach Marktnähe, geringem Investitionsrisiko, steuerlichen Vorteilen, Rechtssicherheit, Humanressourcen sowie niedrigen Betriebs- und Personalkosten getroffen. Die Verkehrsinfrastruktur spielt erst in der zweiten Stufe eine Rolle: Sie ist eine notwendige, aber keine hinreichende Voraussetzung für einen Wirtschaftsstandort; Defizite kommen dennoch teuer. Österreich ist ein Hub für Mittel- und Osteuropa: Der Flughafen Wien bietet mit 35 Destinationen mehr MOE-Ziele als Frankfurt oder München, Österreich liegt im Logistics Performance Index mit 4,0 im Spitzenfeld und an mehreren TEN-V-Korridoren wie Ostsee–Adria, Rhein–Donau und Skandinavien–Mittelmeer." },

  /* ---------- Kapitel 5 ---------- */
  { id: "q-china", kap: "k5", pts: 12, min: 12,
    q: "Beschreiben Sie den Aufstieg Chinas von der „Werkbank der Welt“ zur Wissensmacht.",
    kp: [
      ["1978 Reform- und Öffnungspolitik (Deng), Joint Ventures, Technologietransfer", 2, ["1978", "deng|öffnung", "joint venture|technologietransfer"]],
      ["Wachstum Ø 9,8 % (1978–2008), Exportweltmeister seit 2009, Überschuss ~1,2 Bio. USD, größte VW nach KKP", 2, ["9,8|10 ?%", "exportweltmeister|2009", "überschuss|kaufkraft"]],
      ["Motive westlicher Firmen: Kosten, Absatzmarkt, Umweltauflagen; Umweltprobleme (CO₂ 31 %)", 2, ["kosten", "absatzmarkt|markt", "umwelt"]],
      ["Infrastruktur: > 50.000 km Hochgeschwindigkeit (⅔ des Weltnetzes)", 2, ["hochgeschwindigkeit|50\\.?000|infrastruktur"]],
      ["Wandel: steigende Löhne → China plus one; F&E-Quote 2,7 %, Patente, Brain Gain", 2, ["lohn|china plus one|vietnam", "f&e|forschung|patent|brain gain"]],
      ["Digitalisierung: Mobile first, E-Mobilität, KI, GII Top 10, Digital Silk Road", 2, ["mobile|e-mobil|batterie|ki|digital|gii"]]
    ],
    model: "Chinas Aufstieg begann 1978 mit der Reform- und Öffnungspolitik unter Deng Xiaoping; über Joint Ventures mit westlichen Unternehmen sollte Technologie ins Land kommen. Zwischen 1978 und 2008 wuchs die Wirtschaft im Schnitt um 9,8 % pro Jahr; seit 2009 ist China Exportweltmeister, 2025 erzielte es einen Handelsbilanzüberschuss von rund 1,2 Billionen USD, und nach Kaufkraftparität ist es die größte Volkswirtschaft der Welt. Westliche Unternehmen nutzten China als „Werkbank der Welt“ wegen der Kostenvorteile, des rasch wachsenden Absatzmarkts und weniger strenger Umweltauflagen – mit der Folge massiver Umweltprobleme; China ist heute größter CO2-Emittent, aber auch führend bei Solar- und Windenergie. Zugleich baute der Staat die Infrastruktur rasant aus, etwa auf über 50.000 km Hochgeschwindigkeitsstrecken, mehr als zwei Drittel des Weltnetzes. Weil die Löhne in Ostchina stark stiegen, verlagern Unternehmen Teile der Produktion („China plus one“, z. B. nach Vietnam). China setzt daher auf Hightech: Die F&E-Quote stieg auf rund 2,7 % des BIP, seit 2011 meldet China die meisten Patente an, Rückholprogramme bringen Fachkräfte zurück (Brain Gain). China ist die erste „Mobile-first-Gesellschaft“, führend bei E-Mobilität und Batterien, Weltspitze bei KI und 5G und erreichte 2025 die Top 10 des Global Innovation Index." },

  { id: "q-indien", kap: "k5", pts: 8, min: 8,
    q: "Vergleichen Sie Indien mit China: Liberalisierung, Stärken und Schwächen des Standorts Indien.",
    kp: [
      ["Liberalisierung 1991; Auslöser Golfkrieg-Krise und Zerfall der UdSSR", 3, ["1991", "golf", "sowjet|udssr"]],
      ["Stärken: schnellstes Wachstum großer VW (~6,5–8 %), bevölkerungsreichstes Land seit 2023, Demokratie, Platz 4 nominal", 2, ["wachstum|schnellst", "bevölkerungsreich|2023|1,45"]],
      ["Schwächen: Infrastruktur (Straßen, Bahn, Strom, Wasser), LPI 3,4 < China 3,7", 2, ["infrastruktur", "3,4|lpi|logistik"]],
      ["Handelsbilanzdefizit (China Überschuss); Öffnung später (1991 vs. 1978)", 1, ["defizit", "1978|später"]]
    ],
    model: "Indien, die bevölkerungsreichste Demokratie der Welt, wuchs von 1951 bis 1981 nur um rund 3,6 % pro Jahr. Erst 1991 begann die Liberalisierung, ausgelöst durch eine Finanzkrise nach dem Golfkrieg 1990/91 mit der Rückkehr indischer Arbeiter:innen aus den Golfstaaten und durch den Zusammenbruch der Sowjetunion, Indiens wichtigsten Handelspartner. China hatte sich dagegen schon 1978 geöffnet. Seitdem wächst Indien schneller als Europa und ist heute mit Raten von rund 6,5 bis 8 % die am schnellsten wachsende große Volkswirtschaft; nominal liegt es seit 2025 auf Platz 4, und seit 2023 ist es bevölkerungsreicher als China. Seine Schwächen liegen vor allem in der Infrastruktur – Straßen, Eisenbahn, Wasser- und Stromversorgung – und in der Logistik: Im Logistics Performance Index liegt Indien mit 3,4 hinter China mit 3,7. Zudem hat Indien ein Handelsbilanzdefizit, während China hohe Überschüsse erzielt." },

  { id: "q-hub", kap: "k5", pts: 6, min: 6,
    q: "Erklären Sie das Hub-and-Feeder-System und die Rolle der Häfen in Fernost.",
    kp: [
      ["Großschiffe laufen wenige Haupthäfen (Hubs) an", 2, ["hub|haupthäfen|haupthafen"]],
      ["Feeder (Zubringer) verbinden kleine Häfen; Transshipment (Singapur)", 2, ["feeder|zubringer", "transshipment|umlad|singapur"]],
      ["Skaleneffekte; 7 der 10 größten Häfen in China (Shanghai > 50 Mio. TEU), Perlflussdelta, Hongkong verliert", 2, ["skalen|scale", "shanghai|china|perlfluss|shenzhen"]]
    ],
    model: "Im Hub-and-Feeder-System laufen die großen Containerschiffe der Hauptlinien nur wenige Haupthäfen, die Hubs, an. Kleinere Häfen mit geringem Containeraufkommen werden über Zubringerschiffe, die Feeder, angebunden; im Hub werden die Container von Schiff zu Schiff umgeladen (Transshipment), etwa in Singapur. So lassen sich die Skaleneffekte der Großschiffe nutzen. In Fernost sind zahlreiche Containerhäfen stark gewachsen: Sieben der zehn größten Häfen liegen in China, Shanghai hat als erster Hafen die Marke von 50 Mio. TEU überschritten. Im Perlflussdelta, der „Werkbank der Welt“, hat Shenzhen Hongkong überholt." },

  { id: "q-landbr", kap: "k5", pts: 8, min: 8,
    q: "Vergleichen Sie die eurasischen Landbrücken und erklären Sie, warum der Mittlere Korridor an Bedeutung gewinnt, aber noch keine vollwertige Alternative ist.",
    kp: [
      ["Transsib: ab Wladiwostok, 10.900 km bis Rotterdam, wenige Grenzen; Nachteile: Eis, Gebühren, Kapazitätsgrenze", 2, ["transsib|wladiwostok", "10\\.?900|grenze|zugefroren|eis"]],
      ["Neue Eurasische Landbrücke: ab Lianyungang seit 1992, 11.870 km; Chongqing–Duisburg ~15 Tage", 2, ["lianyungang|neue eurasische", "duisburg|chongqing|15 tage"]],
      ["Ukraine-Krieg/Sanktionen: Nordroute −30–40 % → Mittlerer Korridor (Kasachstan, Kaspisches Meer, Aserbaidschan, Georgien)", 2, ["ukraine|sanktion|krieg", "mittler|kaspi|aserbaidschan|georgien"]],
      ["Engpass: Fähren (~3.000 TEU/Woche vs. 27.500 Transsib vs. 400–500 Tsd. See), Umladen, alte Infrastruktur", 2, ["fähre|kapazität|3\\.?000", "umlad|infrastruktur|27\\.?500"]]
    ],
    model: "Es gibt zwei eurasische Landbrücken. Die nördliche Route beginnt in Wladiwostok und führt über die Transsibirische Eisenbahn nach 10.900 km bis Rotterdam; ihr Vorteil sind wenige Ländergrenzen, Nachteile sind im Winter zugefrorene Häfen, hohe Umschlaggebühren, schwankende Volumina und die Kapazitätsgrenze. Die Neue Eurasische Landbrücke beginnt seit 1992 in Lianyungang, folgt der alten Seidenstraße und endet nach 11.870 km in Rotterdam; Güterzüge wie der YuXinOu verbinden Chongqing mit Duisburg in rund 15 Tagen. Seit den Sanktionen gegen Russland und dem Ukraine-Krieg 2022 ist die Nordroute über Russland riskanter geworden; ihr Volumen brach zunächst um 30 bis 40 % ein. Deshalb wird der Mittlere Korridor über Kasachstan, das Kaspische Meer, Aserbaidschan, Georgien und die Türkei bzw. das Schwarze Meer ausgebaut. Er ist aber noch keine vollwertige Alternative: Über das Kaspische Meer verkehren nur wenige Fähren, die rund 3.000 TEU pro Woche schaffen, während die Transsib etwa 27.500 TEU und der Seeweg 400.000 bis 500.000 TEU pro Woche transportieren; zudem muss mehrfach umgeladen werden, und die Infrastruktur ist teils veraltet." },

  /* ---------- Kapitel 6 ---------- */
  { id: "q-kollaps", kap: "k6", pts: 10, min: 10,
    q: "Nennen und erklären Sie die Ursachen für den Zusammenbruch der sozialistischen Planwirtschaften.",
    kp: [
      ["fixe Preise: keine Knappheitssignale, Menge statt Effizienz", 2, ["fixe preise|feste preise|preis", "effizienz|menge|knapp"]],
      ["mangelnde Arbeitsteilung, veraltete Technik, zu breites Sortiment", 2, ["arbeitsteilung", "veraltet|technik|sortiment"]],
      ["Überindustrialisierung (Industrie bis ⅓ größer), Ressourcenverbrauch; chronische Knappheit", 2, ["überindustrial|ressourcen", "knappheit|mangel"]],
      ["Westverschuldung (5,7 → 75 Mrd. USD), Schirmtheorie, Zahlungsunfähigkeit", 2, ["verschuld|schulden|kredit", "schirm|75|zahlungsunfähig"]],
      ["Rüstungsausgaben (UdSSR real 25–30 % des BSP)", 2, ["rüstung|militär"]]
    ],
    model: "Die Wurzeln des Zusammenbruchs lagen in lebensunfähigen Ökonomien, deren Wachstum seit den 1970er-Jahren immer weiter hinter dem Westen zurückblieb. Der wesentlichste Wachstumshemmer waren die fixen Preise: Sie signalisierten keine Knappheiten, die zentrale Steuerung förderte Menge statt Effizienz, und Angebot und Nachfrage fanden nur auf dem Papier zueinander. Hinzu kam eine mangelnde nationale und internationale Arbeitsteilung; produziert wurde an ungeeigneten Standorten, materialintensiv und mit veralteter Technik, und um Importe zu ersetzen, bot man ein viel zu breites Sortiment an. Der Industriesektor war bis zu einem Drittel größer als in vergleichbaren Marktwirtschaften, was enorme Ressourcen verbrauchte. Wegen der chronischen Knappheit mussten Betriebe viele Zwischenprodukte selbst herstellen, was die Kosten erhöhte. Außerdem verschuldeten sich die RGW-Staaten massiv im Westen, um Technologie zu importieren – von 5,7 Mrd. USD 1971 auf 75 Mrd. USD 1981; die westlichen Kreditgeber vertrauten auf die „Schirmtheorie“, doch Polen, Jugoslawien und Rumänien wurden zahlungsunfähig, und die Sowjetunion war 1991 bankrott. Schließlich verschlangen die Rüstungsausgaben in der Sowjetunion real 25 bis 30 % des Bruttosozialprodukts." },

  { id: "q-transform", kap: "k6", pts: 10, min: 10,
    q: "Vergleichen Sie Gradualismus und Schocktherapie und beschreiben Sie die Folgen der Transformation in Mittel- und Osteuropa.",
    kp: [
      ["Gradualismus: schrittweise (wiiw; Ungarn/Slowenien)", 2, ["gradual|schrittweise|allmählich"]],
      ["Schocktherapie: alles gleichzeitig (Sachs, 2.000 Jahre); Polen 1990 Balcerowicz erfolgreich, Russland gescheitert", 2, ["schock|big bang", "sachs|balcerowicz|polen", "russland"]],
      ["schwieriger als 1945: mehr zerstört, keine Markttradition, kein Marshallplan, schwacher Staat", 2, ["marshall", "tradition|schwach"]],
      ["Transformationskrise: BIP −41 %, Hyperinflation, Arbeitslosigkeit; Polen erholt sich zuerst (1992)", 2, ["41|hyperinflation|arbeitslos|einbruch", "tal der tränen|1992|1996"]],
      ["soziale Folgen: Verarmung, Subsistenz-/Schattenwirtschaft, Ungleichheit, Nationalismus; Dualisierung durch FDI", 2, ["subsistenz|schattenwirtschaft|verarm|korruption|nationalismus", "dual|ungleich"]]
    ],
    model: "Für den Übergang von der Plan- zur Marktwirtschaft gab es zwei Denkschulen. Gradualist:innen, etwa Expert:innen des Wiener Instituts für Internationale Wirtschaftsvergleiche, wollten einen schrittweisen Übergang, um soziale Härten zu begrenzen. Vertreter der Schocktherapie wie Jeffrey Sachs plädierten für einen raschen, gleichzeitigen Übergang mit Preisfreigabe, Liberalisierung, Privatisierung und Stabilisierung – im Tempo Thatchers würde Polens Privatisierung rund 2.000 Jahre dauern. Polen setzte die Schocktherapie am 1. 1. 1990 mit dem Balcerowicz-Plan um, erhielt einen Schuldenerlass von 50 % und überwand 1992 als erstes Land das „Tal der Tränen“; in Russland scheiterte das Modell. Der Umbau war schwieriger als der Wiederaufbau nach 1945, weil weit mehr Anlagen unbrauchbar waren, eine marktwirtschaftliche Tradition fehlte, es keinen Marshallplan gab und der Staat zu schwach war. Die Folge war eine schwere Transformationskrise: Das BIP brach von 1989 bis 1995 im Schnitt um 41 % ein, es gab Hyperinflation und hohe Arbeitslosigkeit. Sozial führte das zu Verarmung, Rückzug in die Subsistenzwirtschaft, wachsender Schattenwirtschaft und Korruption, zunehmender sozialer und regionaler Ungleichheit sowie dem Wiederaufleben von Nationalismus. Auslandsinvestitionen trieben den Aufschwung an, führten aber zu einer Dualisierung der Wirtschaft." },

  { id: "q-wien", kap: "k6", pts: 10, min: 10,
    q: "Warum gilt Österreich als Gewinner der Ostöffnung, und welche Rolle spielt Wien als Headquarter-Standort?",
    kp: [
      ["BIP +10 Mrd. €, ~200.000 Arbeitsplätze; aber Verluste (Outsourcing 15–20 Tsd., Ausflaggen)", 2, ["200\\.?000|arbeitsplätze|jobs", "verlager|outsourc|ausflagg"]],
      ["Sandwich-Position vor 1989 → Internationalisierungsschub, Drehscheibe; ~15.000 Firmen in MOEL", 2, ["sandwich|drehscheibe", "15\\.?000|internationalis"]],
      ["Wien ~220 Regional Headquarters (Österreich ~350) vs. Prag/Budapest/Warschau je 20–25", 2, ["220|headquarter|konzernzentrale", "prag|budapest|warschau"]],
      ["Dunning-Motive: Market Seeking als Hauptmotiv (Efficiency, Resource, Strategic)", 2, ["market seeking|absatzm|markterschl", "efficiency|resource|strategic|dunning"]],
      ["Early Mover (Informationsvorsprung), später fernere Märkte (Rumänien, Bulgarien, Ukraine); Konkurrenz", 2, ["early mover|früh", "rumänien|bulgarien|ukraine"]]
    ],
    model: "Österreich hat von der Ostöffnung wirtschaftlich am stärksten profitiert: Von 1988 bis 2002 stieg das BIP dadurch um rund 10 Mrd. €, und es entstanden etwa 200.000 Arbeitsplätze, auch wenn durch Verlagerungen 15.000 bis 20.000 Jobs verloren gingen und die Transportbranche unter Wettbewerb und Ausflaggen litt. Vor 1989 befanden sich österreichische Unternehmen in einer Sandwich-Position – weder Hightech noch Billigware, kaum international tätig. Die Ostöffnung löste einen Internationalisierungsschub aus, und die günstige Lage brachte Österreich eine Drehscheibenfunktion: Heute sind rund 15.000 österreichische Unternehmen in Mittel- und Osteuropa tätig. Wien ist Sitz von rund 220 Regional Headquarters multinationaler Unternehmen (österreichweit rund 350), die von hier ihr Osteuropageschäft steuern – Budapest, Prag und Warschau haben jeweils nur 20 bis 25. Nach Dunning gibt es vier Motive für Direktinvestitionen: Market, Efficiency, Resource und Strategic Seeking; für österreichische Unternehmen steht die Erschließung neuer Märkte im Vordergrund, bei großen Industrieunternehmen auch niedrige Faktorkosten. Zuerst waren österreichische Firmen dank traditioneller Beziehungen als Early Mover überproportional vertreten; später gingen sie in fernere Märkte wie Rumänien, Bulgarien und die Ukraine. Inzwischen herrscht harte Konkurrenz mit Prag, Budapest und Warschau." },

  { id: "q-donau", kap: "k6", pts: 6, min: 6,
    q: "Beschreiben Sie die Verkehrsinfrastruktur in Mittel- und Osteuropa und die Bedeutung der Donau.",
    kp: [
      ["vor 1989 Bahn führend; seither Investitionen (EU/TEN), v. a. Straße; Defizite bei Autobahnen", 2, ["bahn", "autobahn|straße", "investi|ten|eu"]],
      ["Donau: 2.857 km, ~2.588 schiffbar; ab Kelheim Europaschiffe; Main-Donau-Kanal 1992 → Rhein/Nordsee", 2, ["2\\.?857|2\\.?588|kelheim", "main-donau|rhein|1992"]],
      ["Österreich ~350 km, 10 Schleusen; Unterlauf Schubverbände bis 20.000 t", 2, ["350|schleuse", "20\\.?000|schubverb"]]
    ],
    model: "In allen postsozialistischen Staaten war die Bahn vor 1989 der führende Verkehrsträger, vor allem im Güterverkehr, während Autodichte und hochrangiges Straßennetz nicht mit westlichen Standards mithalten konnten. Seither wurde – teils mit EU-Geldern im Rahmen der TEN – massiv investiert, vor allem in Straßen; Defizite bestehen weiterhin bei Autobahnen. Große Hoffnungen ruhen auf der Donau: Sie ist 2.857 km lang, davon rund 2.588 km schiffbar. Für Europaschiffe ist sie ab Kelheim befahrbar, wo der seit 1992 durchgehend befahrbare Main-Donau-Kanal die Verbindung zu Rhein und Nordsee herstellt. In Österreich sind rund 350 km schiffbar, wobei zehn Kraftwerksschleusen passiert werden müssen; im Unterlauf an der Grenze zwischen Rumänien und Bulgarien können Schubverbände mit bis zu 20.000 t fahren." }
];
