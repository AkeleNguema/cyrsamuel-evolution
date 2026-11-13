const API_URL = 'http://localhost:5000/api';

export interface PlayerProgress {
  id: string;
  userId: string;
  currentLevel: number;
  isBossUnlocked: boolean;
  lastPlayedAt?: string | Date;
}

export interface PlayerCertificate {
  id: string;
  userId: string;
  pdfUrl: string;
  issuedAt: string;
  verifyToken: string;
}

export interface Player {
  id: string;
  avatarName: string;
  createdAt?: string;
  updatedAt?: string;
  progress: PlayerProgress;
  certificates?: PlayerCertificate[];
}

export interface LevelUpResponse {
  message: string;
  newLevel: number;
  isBossUnlocked: boolean;
  player: Player;
  progress: PlayerProgress;
}

export interface ExamQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
}

export interface ExamQuestionsResponse {
  total: number;
  timeLimitPerQuestion: number;
  passingScorePercent: number;
  questions: ExamQuestion[];
}

export interface CorrectionItem {
  questionId: number;
  question: string;
  category: string;
  userAnswer: number | null;
  correctAnswer: number;
  isCorrect: boolean;
  explanation: string;
}

export interface ExamResultResponse {
  passed: boolean;
  score: number;
  totalQuestions: number;
  scorePercentage: number;
  verdict: string;
  message: string;
  certificate?: PlayerCertificate;
  downloadUrl?: string;
  verifyToken?: string;
  corrections?: CorrectionItem[];
}

export const registerPlayer = async (avatarName: string): Promise<{ message: string; player: Player }> => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ avatarName }),
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la création du joueur');
    }
    
    return data;
  } catch (error) {
    console.error("Erreur API registerPlayer :", error);
    throw error;
  }
};

export const getPlayer = async (userId: string): Promise<{ player: Player }> => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la récupération du joueur');
    }

    return data;
  } catch (error) {
    console.error("Erreur API getPlayer :", error);
    throw error;
  }
};

export const levelUpPlayer = async (
  userId: string,
  expectedCurrentLevel?: number
): Promise<LevelUpResponse> => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/level-up`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ expectedCurrentLevel }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors du passage au niveau supérieur');
    }

    return data;
  } catch (error) {
    console.error("Erreur API levelUpPlayer :", error);
    throw error;
  }
};

export const getExamQuestions = async (): Promise<ExamQuestionsResponse> => {
  try {
    const response = await fetch(`${API_URL}/exam/questions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la récupération des questions');
    }

    return data;
  } catch (error) {
    console.error("Erreur API getExamQuestions :", error);
    throw error;
  }
};

export const submitExam = async (
  userId: string,
  answers: { [key: number]: number }
): Promise<ExamResultResponse> => {
  try {
    const response = await fetch(`${API_URL}/exam/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, answers }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la validation de l\'examen');
    }

    return data;
  } catch (error) {
    console.error("Erreur API submitExam :", error);
    throw error;
  }
};

export const getCertificateDownloadUrl = (token: string): string => {
  return `${API_URL}/certificates/${token}/download`;
};

export const verifyCertificate = async (token: string): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/certificates/verify/${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Certificat introuvable');
    }

    return data;
  } catch (error) {
    console.error("Erreur API verifyCertificate :", error);
    throw error;
  }
};
