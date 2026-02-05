import type { ApiResponse } from "@/api/client";
import type { Status } from "@/api/operations/schemas/common";
import { CONFORMITY_STATUS_CODES } from "@/api/operations/schemas/common";
import type {
  ExtractedData,
  CreatedOperation,
  CreateOperationPayload,
} from "@/api/operations/schemas/creation";
import type { GlobalConformityAnalysis } from "@/api/operations/schemas/conformity";
import type {
  OperationDetails,
  OperationFile,
} from "@/api/operations/schemas/details";
import type { DocumentDetails } from "@/api/operations/schemas/document";

// Helper to wrap data in ApiResponse envelope
const wrapResponse = <T>(data: T): ApiResponse<T> => ({
  success: true,
  data,
  message: "OK",
  statusCode: 200,
});

const MOCK_DELAY = 500;

// ──────────────────────────────────────────────
// Status helpers (pour creer des objets Status dans les mocks)
// ──────────────────────────────────────────────

const status = (id: number, code: string, title: string): Status => ({
  id,
  code,
  title,
});

// Conformity statuses (alignes sur les codes backend ConformityStatusCode)
const CONFORMITY_NON_ANALYSED = status(
  1,
  CONFORMITY_STATUS_CODES.NON_ANALYSED,
  "Not analysed",
);
const CONFORMITY_ANALYSIS_IN_PROGRESS = status(
  2,
  CONFORMITY_STATUS_CODES.ANALYSIS_IN_PROGRESS,
  "Analysis in progress",
);
const CONFORMITY_CONFORME = status(
  3,
  CONFORMITY_STATUS_CODES.CONFORME,
  "Compliant",
);
const CONFORMITY_NON_CONFORME = status(
  4,
  CONFORMITY_STATUS_CODES.NON_CONFORME,
  "Non compliant",
);

// ──────────────────────────────────────────────
// MOCK: Delete Operations
// ──────────────────────────────────────────────

export const mockDeleteOperations = (
  _ids: number[],
): Promise<ApiResponse<void>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(wrapResponse(undefined));
    }, MOCK_DELAY);
  });

// ──────────────────────────────────────────────
// MOCK: File Upload
// ──────────────────────────────────────────────

type UploadProgressCallback = (progress: number) => void;

export const mockUploadFile = (
  _file: File,
  onProgress: UploadProgressCallback,
): Promise<void> =>
  new Promise((resolve, reject) => {
    let progress = 0;
    const increment = Math.random() * 15 + 5; // 5-20% per tick
    const intervalTime = Math.random() * 200 + 100; // 100-300ms per tick

    const interval = setInterval(() => {
      progress += increment;

      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        onProgress(100);

        // 5% chance d'échec pour tester le retry
        if (Math.random() < 0.05) {
          reject(new Error("upload_failed"));
        } else {
          resolve();
        }
      } else {
        onProgress(Math.min(progress, 99));
      }
    }, intervalTime);
  });

// ──────────────────────────────────────────────
// MOCK: Extract Data (OCR/IA)
// ──────────────────────────────────────────────

const mockExtractedDataSamples: ExtractedData[] = [
  {
    fost: "BAR-EN-101",
    lieu: "Pennes Mirabeau",
    dateEngagement: "27/03/24",
    signatureDetected: true,
  },
  {
    fost: "BAR-TH-106",
    lieu: "Marseille",
    dateEngagement: "15/04/24",
    signatureDetected: false,
  },
  {
    fost: "BAR-EN-103",
    lieu: "Aix-en-Provence",
    dateEngagement: "02/05/24",
    signatureDetected: true,
  },
];

export const mockExtractData = (): Promise<ApiResponse<ExtractedData>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const randomIndex = Math.floor(
        Math.random() * mockExtractedDataSamples.length,
      );
      resolve(wrapResponse(mockExtractedDataSamples[randomIndex]));
    }, 800);
  });

// ──────────────────────────────────────────────
// MOCK: Create Operation
// ──────────────────────────────────────────────

export const mockCreateOperation = (
  payload: CreateOperationPayload,
): Promise<ApiResponse<CreatedOperation>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        wrapResponse({
          id: `op-${Date.now()}`,
          reference: `OP${String(
            Math.floor(10000000000 + Math.random() * 90000000000),
          ).slice(0, 11)}`,
          name: payload.name,
          fost: payload.fost,
          lieu: payload.lieu,
          dateEngagement: payload.dateEngagement,
          signature: payload.signature,
          status: "Non analysé",
          createdAt: new Date().toISOString(),
        }),
      );
    }, MOCK_DELAY);
  });

// ──────────────────────────────────────────────
// MOCK: Global Conformity Analysis
// ──────────────────────────────────────────────

const mockGlobalConformityAnalysisData: GlobalConformityAnalysis = {
  analyzedAt: "2025-01-15T14:30:00Z",
  globalStatus: CONFORMITY_NON_CONFORME,
  summary:
    "Travaux d'isolation thermique par l'extérieur avec polystyrène 140 mm. Isolation thermique par l'extérieur en 140 mm d'épaisseur, avec 2 couches d'enduit hydraulique (plaque en polystyrène collé et chevillé, armé d'un treillis, polystyrène SINIAT unimat façade: résistance thermique = 3.70",
  verificationSteps: [
    {
      id: "step-1",
      name: "Complétude du dossier",
      subVerifications: [
        {
          id: "sub-1-1",
          name: "-",
          status: CONFORMITY_CONFORME,
          comment: "Documents constitutifs obligatoires présents.",
        },
      ],
    },
    {
      id: "step-2",
      name: "Triangulation Identité/Adresse",
      subVerifications: [
        {
          id: "sub-2-1",
          name: "Identité Bénéficiaire identique (Devis/Facture/AH)",
          status: CONFORMITY_NON_CONFORME,
          comment:
            'Devis: "ASSOCIATION ESPERANCE BANLIEUES - COURS LA PASSERELLE" ; Facture: "ASSOCIATION ESPERANCE BANLIEUES" ; AH Partie B : vide.',
        },
        {
          id: "sub-2-2",
          name: "Adresse Chantier identique (Devis/Facture/AH)",
          status: CONFORMITY_CONFORME,
          comment:
            "Adresse chantier identique 212 rue des Martyrs de la Libération, 69310 Pierre-Bénite (graphies équivalentes).",
        },
        {
          id: "sub-2-3",
          name: "Identité Entreprise (SIREN/SIRET) identique",
          status: CONFORMITY_NON_CONFORME,
          comment:
            "Devis/Facture : WIN ENERGIE (SIREN 539810135). AH Partie C : GAZPROM MARKETING & TRADING FRANCE (SIREN 491388914).",
        },
      ],
    },
    {
      id: "step-3",
      name: "Cohérence Technique Transversale",
      subVerifications: [
        {
          id: "sub-3-1",
          name: "Périmètre technique (hydro-économe) conforme BAT-EQ-133",
          status: CONFORMITY_CONFORME,
          comment:
            "Aérateurs auto-régulés / systèmes hydro-économes mentionnés sur toutes pièces.",
        },
        {
          id: "sub-3-2",
          name: "Nombre d'équipements (Facture vs AH)",
          status: CONFORMITY_CONFORME,
          comment: "Facture: 10 aérateurs (implicite) ; AH: 10.",
        },
      ],
    },
    {
      id: "step-4",
      name: "Chaîne Chronologique",
      subVerifications: [
        {
          id: "sub-4-1",
          name: "Antériorité devis vs début travaux",
          status: CONFORMITY_NON_ANALYSED,
          comment: "Aucune date de début travaux renseignée.",
        },
        {
          id: "sub-4-2",
          name: "Facture postérieure à fin travaux",
          status: CONFORMITY_NON_ANALYSED,
          comment: "Aucune date de fin travaux renseignée.",
        },
        {
          id: "sub-4-3",
          name: "Signature AH postérieure/égale à facture",
          status: CONFORMITY_NON_CONFORME,
          comment:
            "Date signature bénéficiaire AH absente ; facture datée 2022-05-19.",
        },
        {
          id: "sub-4-4",
          name: "Antériorité visite technique",
          status: CONFORMITY_NON_ANALYSED,
          comment: "Aucune date de début travaux renseignée.",
        },
      ],
    },
  ],
  nonConformities: [
    {
      id: "nc-1",
      issue:
        "Identité Bénéficiaire incohérente entre pièces (Devis/Facture/AH)",
      correction:
        "Renseigner et harmoniser la raison sociale dans l'AH Partie B. Joindre une AH corrigée signée et cachetée par le bénéficiaire.",
    },
    {
      id: "nc-2",
      issue:
        "Identité Entreprise/Professionnel incohérente (AH mentionne l'obligé au lieu de l'installateur)",
      correction:
        "Corriger l'AH Partie C avec les informations complètes de WIN ENERGIE (SIREN/SIRET, adresse), préciser le cas échéant la sous-traitance, et apposer cachet et signature.",
    },
    {
      id: "nc-3",
      issue: "Signature et dates AH manquantes",
      correction:
        "Compléter l'AH avec la date de signature du bénéficiaire (postérieure ou égale à la facture 2022-05-19), et les dates requises (engagement, visite si applicable, début/fin travaux).",
    },
    {
      id: "nc-4",
      issue: "Mentions techniques obligatoires absentes sur la facture",
      correction:
        "Émettre un avoir + facture rectificative ou attestation complémentaire précisant clairement l'opération BAT-EQ-133, la nature \"aérateurs auto-régulés\", le débit à 3 bar, la quantité installée (liste explicite), et l'adresse du chantier.",
    },
    {
      id: "nc-5",
      issue: "Absence de fiche technique fabricant avec courbe pression/débit",
      correction:
        "Ajouter la mention du nom de l'obligé/délégataire CEE sur le devis et la facture (par ex. Gazprom Marketing & Trading France), conformément à la fiche.",
    },
    {
      id: "nc-6",
      issue: "Mention de l'obligé/délégataire manquante sur devis/facture",
      correction:
        "Devis CEVOHA du 2024-03-27 pour soufflage de ouate en combles perdus, avec protections électriques et rehausse de trappe. Montant HT 4025.00, TVA 221.38, TTC 4246.38. Ecoprime Picoty déduite 1137.50, net à payer 3108.88. Offre valable jusqu'au 2024-04-26.",
    },
    {
      id: "nc-7",
      issue:
        "Devis non valide (absence de signature bénéficiaire et identité signataire)",
      correction:
        "Faire signer le devis par le bénéficiaire avec nom, prénom, fonction et cachet. À défaut, établir un bon de commande signé reprenant les mentions obligatoires.",
    },
  ],
};

// State to simulate persistence of global conformity analysis
let hasAnalyzedGlobalConformity = false;

// ──────────────────────────────────────────────
// MOCK: Operation Details
// ──────────────────────────────────────────────

const mockOperationDetailsData: Omit<OperationDetails, "globalConformity"> = {
  id: "op-001",
  reference: "OP6548764651321",
  conformity: CONFORMITY_NON_ANALYSED,
  analysisStatus: CONFORMITY_NON_ANALYSED,

  creationDate: "2025-09-05",
  engagementDate: "2026-03-10",
  fostCode: "BAR-EN-101",
  keywords: ["Isolation", "Extérieur", "Polystyrène", "Hydraulique"],
  summary:
    "Travaux d'isolation thermique par l'extérieur avec polystyrène 140 mm isolation thermique par l'extérieur en 140 mm d'épaisseur, avec 2 couches d'enduit hydraulique (plaque en polystyrène collé et chevillé, armé d'un treillis, polystyrène SINIAT unimat façade: résistance thermique = 3.70",

  amountTTC: 43174.29,
  primeCEE: 2296.58,
  quoteSignatureDate: "2023-02-01",
  workAddress: "141, route des Rémouleurs - 84000 Avignon",

  beneficiary: {
    name: "Jean Courty NIBOULIES",
    address: "3 rue de la gare - 84 000 Avignon",
    email: "jeancourty@gmail.com",
    phone: "06 87 98 65 21",
  },

  professionalRGE: {
    siret: "83815597600023",
    address: "27, avenue Dausmenil - 84000 Avignon",
  },

  obligee: "PICOTY",

  files: [
    {
      id: "file-1",
      name: "Facture 6846513",
      summary:
        "Attestation sur l'honneur pour une opération CEE d'isolation de combles/toiture, référence OP156200. Engagement le 2024-03-27, travaux le 2025-01-08, facture FACT0801255305. Surface 175 m2, résistance thermique R=7, épaisseur 350 mm. Site aux Pennes-Mirabeau. Bénéficiaire Laurent Garcia.",
      date: "2025-06-12",
      status: CONFORMITY_NON_CONFORME,
    },
    {
      id: "file-2",
      name: "Facture 684651GKHD",
      summary:
        "Attestation sur l'honneur pour une opération CEE d'isolation de combles/toiture, référence OP156200. Engagement le 2024-03-27, travaux le 2025-01-08, facture FACT0801255305. Surface 175 m2, résistance thermique R=7, épaisseur 350 mm. Site aux Pennes-Mirabeau. Bénéficiaire Laurent Garcia.",
      date: "2025-09-05",
      status: CONFORMITY_NON_CONFORME,
    },
    {
      id: "file-3",
      name: "Facture JHG354351",
      summary:
        "Attestation sur l'honneur pour une opération CEE d'isolation de combles/toiture, référence OP156200. Engagement le 2024-03-27, travaux le 2025-01-08, facture FACT0801255305. Surface 175 m2, résistance thermique R=7, épaisseur 350 mm. Site aux Pennes-Mirabeau. Bénéficiaire Laurent Garcia.",
      date: "2025-12-11",
      status: CONFORMITY_CONFORME,
    },
    {
      id: "file-4",
      name: "Attestation sur l'honneur",
      summary:
        "Attestation sur l'honneur pour une opération CEE d'isolation de combles/toiture, référence OP156200. Engagement le 2024-03-27, travaux le 2025-01-08, facture FACT0801255305. Surface 175 m2, résistance thermique R=7, épaisseur 350 mm. Site aux Pennes-Mirabeau. Bénéficiaire Laurent Garcia.",
      date: "2025-10-28",
      status: CONFORMITY_ANALYSIS_IN_PROGRESS,
    },
    {
      id: "file-5",
      name: "Devis signé",
      summary:
        "Devis CEVOHA du 2024-03-27 pour soufflage de ouate en combles perdus, avec protections électriques et rehausse de trappe. Montant HT 4025.00, TVA 221.38, TTC 4246.38. Ecoprime Picoty déduite 1137.50, net à payer 3108.88. Offre valable jusqu'au 2024-04-26.",
      date: "2026-01-01",
      status: CONFORMITY_CONFORME,
    },
    {
      id: "file-6",
      name: "Devis 67865",
      summary:
        "Devis CEVOHA du 2024-03-27 pour soufflage de ouate en combles perdus, avec protections électriques et rehausse de trappe. Montant HT 4025.00, TVA 221.38, TTC 4246.38. Ecoprime Picoty déduite 1137.50, net à payer 3108.88. Offre valable jusqu'au 2024-04-26.",
      date: "2026-02-15",
      status: CONFORMITY_NON_CONFORME,
    },
    {
      id: "file-7",
      name: "Cadre de contribution",
      summary:
        "Engagement de Picoty SAS à verser une prime CEE pour des travaux d'isolation de combles/toitures, avec montants conditionnés aux ressources. Bénéficiaire identifié, adresse des travaux, surface, fiche CEE BAR-EN-101, date de proposition 2024-12-20.",
      date: "2026-03-20",
      status: CONFORMITY_CONFORME,
    },
  ],
};

export const mockFetchOperationDetails = (
  _id: string,
): Promise<ApiResponse<OperationDetails>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        wrapResponse({
          ...mockOperationDetailsData,
          globalConformity: hasAnalyzedGlobalConformity
            ? mockGlobalConformityAnalysisData
            : null,
        }),
      );
    }, MOCK_DELAY);
  });

// ──────────────────────────────────────────────
// MOCK: Run Global Analysis
// ──────────────────────────────────────────────

export const mockRunGlobalAnalysis = (
  _id: string,
): Promise<ApiResponse<void>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      hasAnalyzedGlobalConformity = true;
      resolve(wrapResponse(undefined));
    }, MOCK_DELAY * 3); // Simulate longer analysis (1.5s)
  });

// ──────────────────────────────────────────────
// MOCK: Upload New File Version
// ──────────────────────────────────────────────

export const mockUploadNewFileVersion = (
  _operationId: string,
  _fileId: string,
  _file: File,
): Promise<ApiResponse<void>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(wrapResponse(undefined));
    }, MOCK_DELAY);
  });

// ──────────────────────────────────────────────
// MOCK: Add File to Operation
// ──────────────────────────────────────────────

export const mockAddFileToOperation = (
  _operationId: string,
  _file: File,
): Promise<ApiResponse<OperationFile>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        wrapResponse({
          id: `file-${Date.now()}`,
          name: "Nouveau fichier",
          summary: "En attente d'analyse...",
          date: new Date().toISOString().split("T")[0],
          status: CONFORMITY_ANALYSIS_IN_PROGRESS,
        }),
      );
    }, MOCK_DELAY);
  });

// ──────────────────────────────────────────────
// MOCK: Document Details (for Document Dialog Step 2)
// ──────────────────────────────────────────────

const mockDocumentDetailsData: DocumentDetails = {
  id: "doc-1",
  name: "Devis 67865",
  conformityStatus: CONFORMITY_NON_CONFORME,
  submissionCount: 3,
  lastSubmissionAt: "2026-02-15T15:54:00Z",
  versions: [
    {
      id: "v1",
      versionNumber: 1,
      uploadedAt: "2026-02-10T10:00:00Z",
      fileUrl: "/mock/devis-v1.pdf",
    },
    {
      id: "v2",
      versionNumber: 2,
      uploadedAt: "2026-02-12T14:30:00Z",
      fileUrl: "/mock/devis-v2.pdf",
    },
    {
      id: "v3",
      versionNumber: 3,
      uploadedAt: "2026-02-15T15:54:00Z",
      fileUrl: "/mock/devis-v3.pdf",
    },
  ],
  currentVersionId: "v3",
  beneficiary: {
    name: "Jean Courty NIBOULIES",
    address: "141, route des Rémouleurs - 84000 Avignon",
    engagementDate: "2025-05-10",
    ficheCEE: "BAR-EN-101",
    ficheCEEDescription:
      "Isolation des combles perdus, 89m2 ISOVER Modele R=7.",
    prime: 679,
  },
  professional: {
    name: "Picoty",
    address: "27, avenue Dausmenil - 84000 Avignon",
  },
  qrCodeUrl: null,
  verifications: [
    {
      id: "v1",
      name: "Mentions entreprise (Raison sociale, SIRET, adresse, coordonnées)",
      status: CONFORMITY_NON_CONFORME,
      comment:
        "SIRET introuvable. SIREN présent (539810135) sans SIRET. Réf. BAT-EQ-133 vA64.6, §2.1.1",
    },
    {
      id: "v2",
      name: "Mentions bénéficiaire (Raison sociale + adresse CP/Ville)",
      status: CONFORMITY_CONFORME,
      comment: "Raison sociale et adresse complètes présentes. Réf. §2.1.2.1-2",
    },
    {
      id: "v3",
      name: "Adresse des travaux bâtiment tertiaire",
      status: CONFORMITY_CONFORME,
      comment:
        "Adresse chantier renseignée et cohérente avec bénéficiaire tertiaire. Réf. §2.1.2.2",
    },
    {
      id: "v4",
      name: "Mention explicite de la fiche BAT-EQ-133",
      status: CONFORMITY_CONFORME,
      comment: "Aérateurs auto-régulés précisés. Réf. §2.1.3.2",
    },
    {
      id: "v5",
      name: "Type d'équipements",
      status: CONFORMITY_CONFORME,
      comment:
        "Aérateurs auto-régulés / systèmes hydro-économes mentionnés sur toutes pièces.",
    },
    {
      id: "v6",
      name: "Marque et référence complète",
      status: CONFORMITY_NON_CONFORME,
      comment:
        'Marque citée (ECOPERL) mais référence complète absente/incomplète ("AIR 57" générique). Réf. §2.1.4.1',
    },
  ],
  verificationSteps: [
    {
      id: "step-1",
      name: "Complétude du dossier",
      subVerifications: [
        {
          id: "sub-1-1",
          name: "-",
          status: CONFORMITY_CONFORME,
          comment: "Documents constitutifs obligatoires présents.",
        },
      ],
    },
    {
      id: "step-2",
      name: "Triangulation Identité/Adresse",
      subVerifications: [
        {
          id: "sub-2-1",
          name: "Identité Bénéficiaire identique (Devis/Facture/AH)",
          status: CONFORMITY_NON_CONFORME,
          comment:
            'Devis: "ASSOCIATION ESPERANCE BANLIEUES - COURS LA PASSERELLE" ; Facture: "ASSOCIATION ESPERANCE BANLIEUES" ; AH Partie B : vide.',
        },
        {
          id: "sub-2-2",
          name: "Adresse Chantier identique (Devis/Facture/AH)",
          status: CONFORMITY_CONFORME,
          comment:
            "Adresse chantier identique 212 rue des Martyrs de la Libération, 69310 Pierre-Bénite (graphies équivalentes).",
        },
        {
          id: "sub-2-3",
          name: "Identité Entreprise (SIREN/SIRET) identique",
          status: CONFORMITY_NON_CONFORME,
          comment:
            "Devis/Facture : WIN ENERGIE (SIREN 539810135). AH Partie C : GAZPROM MARKETING & TRADING FRANCE (SIREN 491388914).",
        },
      ],
    },
    {
      id: "step-3",
      name: "Cohérence Technique Transversale",
      subVerifications: [
        {
          id: "sub-3-1",
          name: "Périmètre technique (hydro-économe) conforme BAT-EQ-133",
          status: CONFORMITY_CONFORME,
          comment:
            "Aérateurs auto-régulés / systèmes hydro-économes mentionnés sur toutes pièces.",
        },
        {
          id: "sub-3-2",
          name: "Nombre d'équipements (Facture vs AH)",
          status: CONFORMITY_CONFORME,
          comment: "Facture: 10 aérateurs (implicite) ; AH: 10.",
        },
      ],
    },
    {
      id: "step-4",
      name: "Chaîne Chronologique",
      subVerifications: [
        {
          id: "sub-4-1",
          name: "Antériorité devis vs début travaux",
          status: CONFORMITY_NON_ANALYSED,
          comment: "Aucune date de début travaux renseignée.",
        },
        {
          id: "sub-4-2",
          name: "Facture postérieure à fin travaux",
          status: CONFORMITY_NON_ANALYSED,
          comment: "Aucune date de fin travaux renseignée.",
        },
        {
          id: "sub-4-3",
          name: "Signature AH postérieure/égale à facture",
          status: CONFORMITY_NON_CONFORME,
          comment:
            "Date signature bénéficiaire AH absente ; facture datée 2022-05-19.",
        },
        {
          id: "sub-4-4",
          name: "Antériorité visite technique",
          status: CONFORMITY_NON_ANALYSED,
          comment: "Aucune date de début travaux renseignée.",
        },
      ],
    },
  ],
};

export const mockFetchDocumentDetails = (
  _operationId: string,
  _documentId: string,
): Promise<ApiResponse<DocumentDetails>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(wrapResponse(mockDocumentDetailsData));
    }, 800); // Slightly longer to simulate analysis
  });
