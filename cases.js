const CASES = [
  {
    "id": "01",
    "title": "The Vanishing Shipment",
    "level": "Cadet",
    "brief": "A fictional relief shipment disappeared from its scheduled route. Establish which warehouse received it, which account authorised the diversion, and whether the delivery claim is credible.",
    "evidence": [
      [
        "E01",
        "Social",
        "Dispatch profile",
        "@northquay.dispatch · 09:10",
        "Our blue relief van is heading to Dock 7. The driver has the original manifest."
      ],
      [
        "E02",
        "Document",
        "Original manifest",
        "Manifest M-204 · 08:45",
        "Destination: Dock 7. Seal: Q-119. No route amendments approved."
      ],
      [
        "E03",
        "Website",
        "Archived tracking page",
        "northquay.example · 10:20",
        "M-204: route amended to Alder Warehouse. Amendment author: OPS-42."
      ],
      [
        "E04",
        "Photo",
        "Loading bay photograph",
        "Image archive · 10:36",
        "Visible sign: ALDER / BAY 3. Van seal reads Q-119. Clock above bay reads 10:36.",
        "ALDER",
        "BAY 3",
        "Q-119"
      ],
      [
        "E05",
        "Domain",
        "Registry record",
        "Registry snapshot · 10:40",
        "northquay-status.example created yesterday. Registrant: fictional privacy service. Unrelated to northquay.example."
      ],
      [
        "E06",
        "Social",
        "Delivery announcement",
        "@northquay-status · 10:50",
        "Shipment M-204 safely delivered to Dock 7 at 10:30! Photo attached is from last month's event."
      ],
      [
        "E07",
        "Document",
        "Account directory",
        "Internal training directory · 08:00",
        "OPS-42: Route Coordinator account. OPS-18: Loading Supervisor. Account ownership does not identify the human operator."
      ]
    ],
    "questions": [
      [
        "Where was the shipment photographed?",
        [
          "Dock 7",
          "Alder Warehouse",
          "Cedar Depot"
        ],
        1,
        [
          "E02",
          "E04"
        ],
        "Match the original seal to the visible warehouse sign.",
        "The seal Q-119 links the photographed van to M-204."
      ],
      [
        "Which account authorised the route amendment?",
        [
          "OPS-18",
          "OPS-42",
          "Unknown account"
        ],
        1,
        [
          "E03",
          "E07"
        ],
        "Compare the tracking entry with the directory.",
        "The tracking record names OPS-42, not a proven human operator."
      ],
      [
        "How should the Dock 7 delivery claim be rated?",
        [
          "Verified",
          "Contradicted by evidence",
          "Confirmed by registry"
        ],
        1,
        [
          "E04",
          "E06"
        ],
        "Compare the photograph time and location to the claimed delivery.",
        "The later photograph places the same sealed van at Alder, and the announcement uses an old image."
      ]
    ]
  },
  {
    "id": "02",
    "title": "The Counterfeit Charity",
    "level": "Analyst",
    "brief": "A charity's name is being used on a donation page. Determine the legitimate domain, identify the imitation's key inconsistency and establish where the advertised image originated.",
    "evidence": [
      [
        "E01",
        "Website",
        "Official charity archive",
        "harbouraid.example · 3 May",
        "Harbour Aid official donation portal: give.harbouraid.example. Registration HA-88."
      ],
      [
        "E02",
        "Domain",
        "Registry snapshot",
        "4 May",
        "harbour-aid-give.example created 4 May. harbouraid.example created four years earlier. Both dates are fictional."
      ],
      [
        "E03",
        "Website",
        "Imitation donation page",
        "harbour-aid-give.example · 5 May",
        "Registered organisation HA-81. Donation beneficiary shown as Silver Lantern Media."
      ],
      [
        "E04",
        "Document",
        "Charity register extract",
        "2 May",
        "HA-88: Harbour Aid. HA-81: unrelated dormant arts organisation. Authorised beneficiary: Harbour Aid."
      ],
      [
        "E05",
        "Photo",
        "Fundraising photo",
        "5 May",
        "Banner: WINTER EXPO 2024. A distinctive triangular blue booth appears behind volunteers.",
        "WINTER EXPO",
        "2024",
        "BLUE BOOTH"
      ],
      [
        "E06",
        "Social",
        "Event archive",
        "@winterexpo · 12 July 2024",
        "Original gallery: triangular blue booth, volunteers and WINTER EXPO 2024 banner."
      ],
      [
        "E07",
        "Social",
        "Viral repost",
        "@helpnow · 5 May",
        "This looks genuine! Shared by 2,000 accounts. No independent verification."
      ]
    ],
    "questions": [
      [
        "Which domain is supported by the official archive?",
        [
          "harbour-aid-give.example",
          "give.harbouraid.example",
          "winterexpo.example"
        ],
        1,
        [
          "E01",
          "E02"
        ],
        "Look for the exact spelling and domain age.",
        "The official archive explicitly lists the subdomain."
      ],
      [
        "What is the strongest identity inconsistency?",
        [
          "Number of reposts",
          "Different registration and beneficiary",
          "Domain age alone"
        ],
        1,
        [
          "E03",
          "E04"
        ],
        "Compare registration and beneficiary fields.",
        "The imitation's registration and beneficiary do not match the register."
      ],
      [
        "Where did the advertised photo originate?",
        [
          "Winter Expo 2024",
          "Current aid distribution",
          "Unknown stock agency"
        ],
        0,
        [
          "E05",
          "E06"
        ],
        "Match visible features to the event archive.",
        "The matching banner and booth support reuse of the older event photograph."
      ]
    ]
  },
  {
    "id": "03",
    "title": "The Forged Conference",
    "level": "Analyst",
    "brief": "A leaked invitation claims a research conference was moved. Establish the verified venue, the image provenance and the reliability of the invitation.",
    "evidence": [
      [
        "E01",
        "Website",
        "Conference programme",
        "atlasforum.example · 12 June",
        "Atlas Forum: 14 June, Meridian Hall, room M2. Official organiser: Atlas Research."
      ],
      [
        "E02",
        "Document",
        "Leaked invitation",
        "13 June · unsigned copy",
        "URGENT: event moved to Orion Centre. Confirmation number AT-900. Contact: atlas-tickets.example."
      ],
      [
        "E03",
        "Domain",
        "Domain history",
        "13 June",
        "atlas-tickets.example registered 13 June. atlasforum.example registered 2021."
      ],
      [
        "E04",
        "Social",
        "Organiser update",
        "@atlasforum · 13 June",
        "No venue change. Meridian Hall M2. Beware unofficial invitations."
      ],
      [
        "E05",
        "Photo",
        "Invitation photograph",
        "13 June",
        "Entrance sign reads ORION EXPO 2023. Orange geometric canopy visible.",
        "ORION EXPO",
        "2023",
        "ENTRANCE"
      ],
      [
        "E06",
        "Website",
        "Venue gallery archive",
        "orioncentre.example · 2023",
        "Expo 2023 gallery describes orange geometric canopy and ORION EXPO entrance sign."
      ],
      [
        "E07",
        "Document",
        "Booking ledger",
        "14 June · venue records",
        "Meridian Hall M2 booked by Atlas Research. Orion Centre has no Atlas booking on 14 June."
      ]
    ],
    "questions": [
      [
        "Which venue is independently corroborated?",
        [
          "Orion Centre",
          "Meridian Hall M2",
          "No venue"
        ],
        1,
        [
          "E01",
          "E07"
        ],
        "Cross-check programme and booking ledger.",
        "Independent booking records support the official programme."
      ],
      [
        "What does the photograph depict?",
        [
          "Current Atlas Forum",
          "Meridian Hall",
          "Orion Expo 2023"
        ],
        2,
        [
          "E05",
          "E06"
        ],
        "Compare the sign and canopy.",
        "The venue gallery matches the older expo image."
      ],
      [
        "What is the invitation's reliability?",
        [
          "Verified",
          "Contradicted by official update",
          "Proven authentic by confirmation number"
        ],
        1,
        [
          "E02",
          "E04"
        ],
        "An unsigned copy is weaker than a corroborated organiser update.",
        "The official organiser explicitly denies the claimed venue change."
      ]
    ]
  },
  {
    "id": "04",
    "title": "The Misattributed Leak",
    "level": "Investigator",
    "brief": "A fictional product design has appeared online. Distinguish an account from a person and assess whether a viral screenshot accurately represents a confidential file.",
    "evidence": [
      [
        "E01",
        "Document",
        "Design catalogue",
        "Revision register · 09:00",
        "Project Lumen: public concept L-12 rev A. Confidential prototype L-12 rev C."
      ],
      [
        "E02",
        "Social",
        "Viral allegation",
        "@rumourdesk · 12:00",
        "Engineer Jules leaked the secret design! Screenshot shows L-12 / REV A."
      ],
      [
        "E03",
        "Website",
        "Public archive",
        "lumenlab.example · 1 April",
        "Public concept L-12 revision A available in the press kit since 1 April."
      ],
      [
        "E04",
        "Photo",
        "Screenshot exhibit",
        "12:00",
        "Footer reads L-12 / REV A / PRESS PREVIEW. No confidential watermark.",
        "L-12",
        "REV A",
        "PRESS PREVIEW"
      ],
      [
        "E05",
        "Document",
        "Publication log",
        "11:48",
        "Press mirror upload made by account EDIT-7. Account is shared by authorised editors. No person-level audit data."
      ],
      [
        "E06",
        "Document",
        "Account policy",
        "Current policy",
        "EDIT-7 is a shared publishing account. A login event cannot establish individual identity."
      ],
      [
        "E07",
        "Domain",
        "Mirror registry",
        "12:10",
        "pressmirror.example is registered by a fictional news syndication service. Registry does not identify upload author."
      ]
    ],
    "questions": [
      [
        "Which revision appears in the screenshot?",
        [
          "Revision C",
          "Revision A",
          "Revision B"
        ],
        1,
        [
          "E01",
          "E04"
        ],
        "Read the footer and compare the catalogue.",
        "The screenshot explicitly shows revision A."
      ],
      [
        "Was the shown design confidential?",
        [
          "Yes",
          "No, already public",
          "Impossible because domain is a mirror"
        ],
        1,
        [
          "E03",
          "E04"
        ],
        "Find the earlier public publication.",
        "The screenshot matches the publicly available concept."
      ],
      [
        "Can Jules be identified as the uploader?",
        [
          "Yes, the rumour proves it",
          "Yes, the domain proves it",
          "No, individual attribution is unsupported"
        ],
        2,
        [
          "E05",
          "E06"
        ],
        "Separate shared account activity from personal identity.",
        "Shared account logs do not establish who performed the upload."
      ]
    ]
  },
  {
    "id": "05",
    "title": "Operation False Horizon",
    "level": "Expert",
    "brief": "Multiple sources claim a fictional coastal monitoring station suffered an outage. Reconstruct the timeline, verify the image and distinguish a reporting error from a confirmed incident.",
    "evidence": [
      [
        "E01",
        "Website",
        "Service status archive",
        "horizonlab.example · 08:00 UTC",
        "Station H-3 telemetry normal. Scheduled dashboard maintenance 09:00–09:30 UTC."
      ],
      [
        "E02",
        "Social",
        "Outage claim",
        "@horizonwatch · 11:12 UTC+2",
        "H-3 has gone dark! Dashboard screenshot shows no readings. Complete station failure."
      ],
      [
        "E03",
        "Document",
        "Telemetry export",
        "09:00–09:30 UTC",
        "H-3 heartbeats every five minutes throughout maintenance. Battery and sensor values normal."
      ],
      [
        "E04",
        "Photo",
        "Station photo",
        "Image exhibit · undated",
        "Sign H-2, red roof, three antennas. Caption claims H-3 destruction.",
        "H-2",
        "RED ROOF",
        "3 ANTENNAS"
      ],
      [
        "E05",
        "Website",
        "Station directory",
        "horizonlab.example · archive",
        "H-2: red roof, three antennas. H-3: grey roof, two antennas."
      ],
      [
        "E06",
        "Document",
        "Incident summary",
        "10:00 UTC",
        "Dashboard presentation unavailable during scheduled maintenance. No recorded telemetry loss."
      ],
      [
        "E07",
        "Domain",
        "Claimant domain record",
        "10:05 UTC",
        "horizon-watch.example is not listed among Horizon Lab's official domains."
      ],
      [
        "E08",
        "Social",
        "Unverified reply",
        "@coastnotes · 10:01 UTC",
        "Someone said the station was destroyed. No firsthand observation."
      ]
    ],
    "questions": [
      [
        "When was the outage claim posted in UTC?",
        [
          "11:12",
          "09:12",
          "13:12"
        ],
        1,
        [
          "E01",
          "E02"
        ],
        "Subtract two hours from the displayed local timestamp.",
        "09:12 UTC falls within planned dashboard maintenance."
      ],
      [
        "Which station is shown in the photo?",
        [
          "H-3",
          "H-2",
          "Both"
        ],
        1,
        [
          "E04",
          "E05"
        ],
        "Match the roof, antennas and sign.",
        "All three visible features match H-2."
      ],
      [
        "What conclusion is best supported?",
        [
          "Confirmed destruction",
          "Confirmed station failure",
          "Dashboard maintenance, no recorded telemetry loss"
        ],
        2,
        [
          "E03",
          "E06"
        ],
        "Distinguish the dashboard from the underlying sensor feed.",
        "Continuous telemetry and the incident summary support a presentation outage only."
      ]
    ]
  }
];
function score(caseData,answers,hints){
 const details=caseData.questions.map((q,i)=>{const a=answers[i]||{}, correct=a.choice===q[2], chosen=Array.isArray(a.refs)?a.refs:[], supported=q[3].every(id=>chosen.includes(id)), exact=supported&&chosen.length===q[3].length;return {correct,supported,points:correct?(exact?100:supported?80:40):0};});
 return {details,total:Math.max(0,details.reduce((s,d)=>s+d.points,0)-Math.min(3,hints.length)*15),max:caseData.questions.length*100};
}
function validate(data){
 const ids=new Set(); for(const c of data){if(ids.has(c.id)||!c.questions.length)throw Error("Invalid case");ids.add(c.id);const e=new Set(c.evidence.map(x=>x[0]));if(e.size!==c.evidence.length)throw Error("Duplicate evidence");for(const q of c.questions){if(!q[1][q[2]]||!q[3].length||q[3].some(x=>!e.has(x)))throw Error("Invalid answer reference");}}
 return true;
}
if(typeof module !== 'undefined') module.exports={CASES,score,validate};
