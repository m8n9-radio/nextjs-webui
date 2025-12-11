export const getEnvVar = (key: string, defaultValue = ""): string => {
  const value = process.env[key];
  if (!value && !defaultValue) {
    console.warn(`Environment variable ${key} is not set`);
  }
  return value || defaultValue;
};

export const validateEnv = () => {
  const required = [
    "NEXT_PUBLIC_ICECAST_HOST",
    "NEXT_PUBLIC_ICECAST_MOUNT",
    "NEXT_PUBLIC_RADIO_NAME",
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
    return false;
  }

  return true;
};
