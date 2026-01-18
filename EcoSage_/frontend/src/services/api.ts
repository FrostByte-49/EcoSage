const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://ecosage-aa5l.onrender.com/api';

/* Common Response Interface */
export interface AnalysisResponse<T = unknown> {
  success: boolean;

  // Legacy support (Existing Pages Depend On This)
  analysis?: string;

  // New structured data (basic / detail)
  data?: T;

  error?: string;
  timestamp: string;
}

/* Basic Analysis */
export async function analyzeBasic(imageBase64: string): Promise<AnalysisResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/analysis/basic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageBase64 }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Basic analysis failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Basic Analysis Error:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to connect to server',
      timestamp: new Date().toISOString(),
    };
  }
}

/* Detailed Analysis */
export async function analyzeDetail(imageBase64: string): Promise<AnalysisResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/analysis/detail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageBase64 }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Detailed analysis failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Detail Analysis Error:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to connect to server',
      timestamp: new Date().toISOString(),
    };
  }
}

/* Legacy Support */
export async function analyzeProduct(imageBase64: string): Promise<AnalysisResponse> {
  console.warn(
    '⚠️ analyzeProduct is deprecated. Use analyzeBasic + analyzeDetail instead.'
  );

  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageBase64 }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Analysis failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Legacy API Error:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to connect to server',
      timestamp: new Date().toISOString(),
    };
  }
}
