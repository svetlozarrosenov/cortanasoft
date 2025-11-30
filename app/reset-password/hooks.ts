import axios from 'axios';

const urls = {
  confirmPasswordReset: `${process.env.NEXT_PUBLIC_BACK_END_URL}/auth/confirm-password-reset`,
};

export async function confirmPasswordReset(token: string, newPassword: string, confirmNewPassword: string) {
  try {
    const response = await axios.post(
      urls.confirmPasswordReset,
      { token, newPassword, confirmNewPassword },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Грешка при смяната на паролата');
    }
    console.error('Error confirming password reset:', error);
    throw error;
  }
}