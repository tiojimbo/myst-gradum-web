import type { SessionCardProps } from "@/components/shared/session-card";
import type { PhaseCardProps } from "@/components/shared/phase-card";
export const SESSION: SessionCardProps = { title: "Exposição, cor e narrativa", project: "Audiovisual", duration: "1h15", activities: [{ label: "Preview", duration: "5 min" }, { label: "3 videoaulas", duration: "40 min" }, { label: "Recall", duration: "8 min" }, { label: "Perguntas", duration: "10 min" }, { label: "Exercício", duration: "12 min" }], sources: ["Filmmaking Academy"] };
export const PHASES: PhaseCardProps[] = [{ index: 1, title: "Fundamentos", state: "concluida", mastery: 92 }, { index: 2, title: "Domínio técnico", state: "atual", mastery: 67 }, { index: 3, title: "Edição e narrativa", state: "futura", mastery: 0 }];
export const RESOURCES = [{ title: "Filmmaking Academy", kind: "Curso", count: "371 aulas" }, { title: "Color Science", kind: "Documento", count: "24 páginas" }, { title: "Shutter Speed", kind: "Aula", count: "18 min" }];
export const ICONS = ["sun", "route", "book-open", "refresh", "bar-chart-2", "graduation-cap", "global", "file-text", "play-circle", "sticky-note", "stack", "timer", "search", "settings-3", "notification-3", "shield-check", "shield", "upload-cloud-2", "focus-3", "mic", "scales-3", "inbox", "check", "checkbox-circle", "check-double", "alert", "error-warning", "close-circle", "arrow-right", "arrow-right-up", "arrow-down-s", "more-2", "add", "close", "question", "star", "eye", "mail", "google", "loader-4", "list-settings", "compass-3", "brain", "question-answer", "tools"] as const;

export const REFERENCE_DATA = {
  "PROJECTS": [
    {
      "id": "av",
      "name": "Audiovisual avançado",
      "color": "var(--gr-action)"
    },
    {
      "id": "en",
      "name": "Inglês profissional",
      "color": "var(--gr-success)"
    },
    {
      "id": "mk",
      "name": "Marketing",
      "color": "var(--gr-warning)"
    }
  ],
  "PLANS": [
    {
      "id": "av",
      "name": "Audiovisual profissional",
      "project": "Audiovisual avançado",
      "color": "var(--gr-action)",
      "status": "ativo",
      "priority": "Principal",
      "phase": "2 de 6",
      "hours": "8h/semana",
      "deadline": "06 dez 2026",
      "mastery": 61,
      "weeks": 12,
      "sessions": 37,
      "share": 67,
      "goal": "Atuar profissionalmente como editor audiovisual",
      "target": "Profissional — consigo trabalhar sozinho em projetos reais.",
      "sources": [
        "FAW School",
        "Adobe Learn",
        "Blackmagic Training"
      ],
      "phases": [
        {
          "title": "Fundamentos",
          "state": "concluida"
        },
        {
          "title": "Domínio técnico",
          "state": "atual",
          "mastery": 61
        },
        {
          "title": "Edição e narrativa"
        },
        {
          "title": "Color + áudio"
        },
        {
          "title": "Integração"
        },
        {
          "title": "Projeto final"
        }
      ],
      "phaseRows": [
        {
          "id": 1,
          "phase": "Fundamentos",
          "sessions": 6,
          "mastery": "100%"
        },
        {
          "id": 2,
          "phase": "Domínio técnico",
          "sessions": 9,
          "mastery": "61%"
        },
        {
          "id": 3,
          "phase": "Edição e narrativa",
          "sessions": 8,
          "mastery": "—"
        },
        {
          "id": 4,
          "phase": "Color + áudio",
          "sessions": 7,
          "mastery": "—"
        },
        {
          "id": 5,
          "phase": "Integração",
          "sessions": 4,
          "mastery": "—"
        },
        {
          "id": 6,
          "phase": "Projeto final",
          "sessions": 3,
          "mastery": "—"
        }
      ],
      "week": [
        {
          "day": "Seg 07",
          "entries": [
            {
              "time": "09:00",
              "title": "Color Science",
              "subtitle": "Espaços de cor",
              "duration": "75 min"
            }
          ]
        },
        {
          "day": "Ter 08",
          "entries": [
            {
              "time": "09:00",
              "title": "Montagem narrativa",
              "subtitle": "Ritmo e corte",
              "duration": "90 min"
            }
          ]
        },
        {
          "day": "Qua 09",
          "entries": [
            {
              "time": "07:00",
              "title": "Exercício guiado",
              "subtitle": "Conversão Rec.709",
              "duration": "60 min"
            }
          ]
        }
      ],
      "days": [
        {
          "day": "07",
          "lines": [
            "● 1 sessão",
            "↻ 8 revisões"
          ]
        },
        {
          "day": "08",
          "lines": [
            "● 1 sessão"
          ]
        },
        {
          "day": "09",
          "lines": [
            "● 1 sessão",
            "↻ 4 revisões"
          ]
        },
        {
          "day": "10",
          "empty": true
        }
      ],
      "calendar": [
        1,
        2,
        3,
        7,
        8,
        9,
        10,
        14,
        15,
        16,
        17,
        21,
        22,
        23
      ],
      "currentPhase": {
        "title": "Domínio técnico",
        "note": "Câmera, exposição e espaços de cor até o ponto em que decisões técnicas deixam de exigir consulta.",
        "remaining": "9 sessões",
        "hours": "~11h restantes",
        "targetMastery": "alvo 80%"
      }
    },
    {
      "id": "en",
      "name": "Conversação profissional",
      "project": "Inglês profissional",
      "color": "var(--gr-success)",
      "status": "ativo",
      "priority": "Secundário",
      "phase": "3 de 5",
      "hours": "4h/semana",
      "deadline": "28 fev 2027",
      "mastery": 74,
      "weeks": 20,
      "sessions": 41,
      "share": 33,
      "goal": "Conduzir reuniões técnicas em inglês sem preparo prévio",
      "target": "Profissional — consigo sustentar a reunião sozinho.",
      "sources": [
        "BBC Learning English",
        "Transcrições próprias"
      ],
      "phases": [
        {
          "title": "Listening ativo",
          "state": "concluida"
        },
        {
          "title": "Vocabulário técnico",
          "state": "concluida"
        },
        {
          "title": "Produção falada",
          "state": "atual",
          "mastery": 74
        },
        {
          "title": "Reuniões simuladas"
        },
        {
          "title": "Negociação"
        }
      ],
      "phaseRows": [
        {
          "id": 1,
          "phase": "Listening ativo",
          "sessions": 8,
          "mastery": "100%"
        },
        {
          "id": 2,
          "phase": "Vocabulário técnico",
          "sessions": 7,
          "mastery": "100%"
        },
        {
          "id": 3,
          "phase": "Produção falada",
          "sessions": 10,
          "mastery": "74%"
        },
        {
          "id": 4,
          "phase": "Reuniões simuladas",
          "sessions": 9,
          "mastery": "—"
        },
        {
          "id": 5,
          "phase": "Negociação",
          "sessions": 7,
          "mastery": "—"
        }
      ],
      "week": [
        {
          "day": "Seg 07",
          "entries": [
            {
              "time": "14:00",
              "title": "Listening",
              "subtitle": "Podcast técnico",
              "duration": "50 min",
              "color": "var(--gr-success)"
            }
          ]
        },
        {
          "day": "Qua 09",
          "entries": [
            {
              "time": "14:00",
              "title": "Produção falada",
              "subtitle": "Shadowing",
              "duration": "45 min",
              "color": "var(--gr-success)"
            }
          ]
        }
      ],
      "days": [
        {
          "day": "07",
          "lines": [
            "● 1 sessão"
          ]
        },
        {
          "day": "08",
          "empty": true
        },
        {
          "day": "09",
          "lines": [
            "● 1 sessão",
            "↻ 6 revisões"
          ]
        },
        {
          "day": "10",
          "empty": true
        }
      ],
      "calendar": [
        2,
        4,
        9,
        11,
        16,
        18,
        23,
        25
      ],
      "currentPhase": {
        "title": "Produção falada",
        "note": "Sair do reconhecimento passivo e sustentar fala espontânea sobre temas técnicos.",
        "remaining": "10 sessões",
        "hours": "~8h restantes",
        "targetMastery": "alvo 85%"
      }
    },
    {
      "id": "mk",
      "name": "Portfólio e posicionamento",
      "project": "Marketing",
      "color": "var(--gr-warning)",
      "status": "pausado",
      "priority": "Manutenção",
      "phase": "1 de 4",
      "hours": "—",
      "deadline": "sem prazo",
      "mastery": 18,
      "weeks": 8,
      "sessions": 14,
      "share": 0,
      "goal": "Montar e posicionar um portfólio que gere cliente",
      "target": "Proficiência — consigo executar com apoio de referência.",
      "sources": [
        "Notas próprias"
      ],
      "phases": [
        {
          "title": "Diagnóstico de portfólio",
          "state": "atual",
          "mastery": 18
        },
        {
          "title": "Narrativa de caso"
        },
        {
          "title": "Canais e presença"
        },
        {
          "title": "Proposta e preço"
        }
      ],
      "phaseRows": [
        {
          "id": 1,
          "phase": "Diagnóstico de portfólio",
          "sessions": 4,
          "mastery": "18%"
        },
        {
          "id": 2,
          "phase": "Narrativa de caso",
          "sessions": 4,
          "mastery": "—"
        },
        {
          "id": 3,
          "phase": "Canais e presença",
          "sessions": 3,
          "mastery": "—"
        },
        {
          "id": 4,
          "phase": "Proposta e preço",
          "sessions": 3,
          "mastery": "—"
        }
      ],
      "week": [],
      "days": [
        {
          "day": "07",
          "empty": true
        },
        {
          "day": "08",
          "empty": true
        },
        {
          "day": "09",
          "empty": true
        },
        {
          "day": "10",
          "empty": true
        }
      ],
      "calendar": [],
      "currentPhase": {
        "title": "Diagnóstico de portfólio",
        "note": "Plano pausado: nenhuma sessão é agendada enquanto a prioridade for Manutenção.",
        "remaining": "4 sessões",
        "hours": "paradas",
        "targetMastery": "alvo 60%"
      }
    }
  ],
  "SEARCH_GROUPS": [
    {
      "label": "Competências",
      "activeIndex": 0,
      "items": [
        {
          "label": "Shutter Speed",
          "icon": "focus-3",
          "meta": "61%"
        }
      ]
    },
    {
      "label": "Aulas",
      "items": [
        {
          "label": "Shutter Speed — FAW Aula 09",
          "icon": "play-circle"
        }
      ]
    },
    {
      "label": "Notas",
      "items": [
        {
          "label": "Regra dos 180°",
          "icon": "sticky-note"
        }
      ]
    },
    {
      "label": "Flashcards",
      "items": [
        {
          "label": "3 itens",
          "icon": "stack"
        }
      ]
    }
  ],
  "SESSION": {
    "title": "Color Science — Espaços de Cor",
    "project": "Audiovisual",
    "duration": "1h15",
    "activities": [
      {
        "label": "Preview",
        "duration": "5 min"
      },
      {
        "label": "3 videoaulas",
        "duration": "47 min"
      },
      {
        "label": "Recall",
        "duration": "8 min"
      },
      {
        "label": "Perguntas",
        "duration": "5 min"
      },
      {
        "label": "Exercício",
        "duration": "10 min"
      }
    ],
    "sources": [
      {
        "name": "FAW School"
      },
      {
        "name": "Adobe Learn",
        "icon": "global"
      }
    ]
  },
  "COMPETENCIES": [
    {
      "name": "Edição",
      "mastery": 91
    },
    {
      "name": "Storytelling",
      "mastery": 74
    },
    {
      "name": "Câmera",
      "mastery": 58
    },
    {
      "name": "Color",
      "mastery": 52
    },
    {
      "name": "Áudio",
      "mastery": 46
    }
  ],
  "PHASES": [
    {
      "title": "Fundamentos",
      "state": "concluida"
    },
    {
      "title": "Domínio técnico",
      "state": "atual",
      "mastery": 61
    },
    {
      "title": "Edição e narrativa"
    },
    {
      "title": "Color + áudio"
    },
    {
      "title": "Integração"
    },
    {
      "title": "Projeto final"
    }
  ],
  "WEEK": [
    {
      "day": "Seg 07",
      "entries": [
        {
          "time": "09:00",
          "title": "Audiovisual",
          "subtitle": "Color Science",
          "duration": "75 min"
        },
        {
          "time": "14:00",
          "title": "Inglês",
          "subtitle": "Listening",
          "duration": "50 min",
          "color": "var(--gr-success)"
        }
      ]
    },
    {
      "day": "Ter 08",
      "entries": [
        {
          "time": "09:00",
          "title": "Audiovisual",
          "subtitle": "Montagem narrativa",
          "duration": "90 min"
        }
      ]
    },
    {
      "day": "Qua 09",
      "entries": [
        {
          "time": "07:00",
          "title": "Audiovisual",
          "subtitle": "Exercício guiado",
          "duration": "60 min"
        },
        {
          "time": "19:00",
          "title": "Marketing",
          "subtitle": "Posicionamento",
          "duration": "45 min",
          "color": "var(--gr-warning)"
        }
      ]
    }
  ],
  "RESOURCES": [
    {
      "kind": "curso",
      "title": "FAW School",
      "meta": "Curso · 371 aulas · 109h15",
      "progress": 34,
      "tags": [
        "Importado",
        "34% estudado"
      ],
      "project": "Audiovisual"
    },
    {
      "kind": "curso",
      "title": "Blackmagic Training",
      "meta": "Curso · 64 aulas · 21h40",
      "progress": 8,
      "tags": [
        "Referência oficial"
      ],
      "project": "Audiovisual"
    },
    {
      "kind": "documento",
      "title": "Camera Fundamentals.pdf",
      "meta": "Documento · 42 páginas"
    },
    {
      "kind": "aula",
      "title": "Color Spaces — Aula 13",
      "meta": "Aula · 41:15 · FAW School",
      "progress": 45
    },
    {
      "kind": "livro",
      "title": "In the Blink of an Eye",
      "meta": "Livro · 6 capítulos"
    }
  ],
  "NOTES": [
    {
      "timestamp": "18:32",
      "title": "Rec.709 × Display P3",
      "body": "Diferença de gamut e quando cada espaço é obrigatório na entrega.",
      "context": "Color Science · FAW School · Aula 13"
    },
    {
      "timestamp": "07:12",
      "title": "Regra dos 180°",
      "body": "Manter o eixo entre personagens para não inverter a geografia da cena.",
      "context": "Montagem · FAW School · Aula 09",
      "kind": "importante"
    },
    {
      "timestamp": "24:05",
      "title": "Por que log não é LUT?",
      "body": "Confirmar com a documentação da Blackmagic antes de virar flashcard.",
      "context": "Color Science · FAW School · Aula 14",
      "kind": "duvida"
    }
  ],
  "REVIEW_ITEMS": [
    {
      "kind": "Flashcard",
      "prompt": "Qual a diferença prática entre Rec.709 e Display P3?",
      "meta": "Color · vence hoje"
    },
    {
      "kind": "Pergunta aberta",
      "prompt": "Explique quando usar shutter 1/50 em 25fps.",
      "meta": "Câmera · vence hoje"
    },
    {
      "kind": "Conceito frágil",
      "prompt": "Curva log e alocação de bits",
      "meta": "Color · 2 erros seguidos"
    },
    {
      "kind": "Erro anterior",
      "prompt": "Você trocou gamut por gamma na última revisão.",
      "meta": "Color · há 3 dias"
    }
  ]
};
