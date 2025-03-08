const headerToken = (token: string) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

export default headerToken;
