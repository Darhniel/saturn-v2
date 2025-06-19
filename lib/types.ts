export type FormDataType = {
    fullName: string;
    email: string;
    phone: string;
    investmentInterest: string;
    investmentSize: string;
    referral: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: string;
    address: string;
    investmentAppetite: string;
    preferredPortfolioTypes: string[];
    files: File[];
    file: Record<string, string>;
    agree: boolean;
    // userType: "individual";
};

export type StepProps = {
    data: FormDataType;
    onNext: (data: Partial<FormDataType>) => void;
};

export interface UploadedFile {
    file: File;
    previewUrl: string;
    progress: number;
    error?: string;
}

export enum FormState {
    LOGIN,
    FORGOT_PASSWORD,
    OTP,
    RESET_PASSWORD,
    SUCCESS
}

// fullname
// email
// phone
// investment Interest
// investmentSize
// how did you hear about us
// password
// confirmPassword
