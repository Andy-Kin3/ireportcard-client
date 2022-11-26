const LOCAL_STORAGE_KEY = {
  sessionId: 'rc_session_id',
  school: 'rc_school',
  schoolId: 'rc_school_id',
  rememberMe: 'rc_remember_me',
  schoolManager: "rc_school_manager"

};
export module LocalStorageUtil {
  export const writeUserToken = (token: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEY.sessionId, token)
  }

  export const readUserToken = (): string => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.sessionId);
    return token ? token : '';
  }

  export const deleteUserToken = (): void => {
    localStorage.removeItem(LOCAL_STORAGE_KEY.sessionId);
  }

  export const writeSchoolId = (schoolId: number): void => {
    localStorage.setItem(LOCAL_STORAGE_KEY.schoolId, String(schoolId));
  }

  export const readSchoolId = (): number | null => {
    const id = localStorage.getItem(LOCAL_STORAGE_KEY.schoolId);
    return id ? parseInt(id) : null;
  }

  export const deleteSchoolId = (): void => {
    localStorage.removeItem(LOCAL_STORAGE_KEY.schoolId);
  }

  export const writeSchoolManager = (schoolManagerLocal: SchoolManagerLocal) => {
    localStorage.setItem(LOCAL_STORAGE_KEY.schoolManager, JSON.stringify(schoolManagerLocal));
  }

  export const readSchoolManager = (): SchoolManagerLocal => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.schoolManager) ?? "") as SchoolManagerLocal
  }
}
