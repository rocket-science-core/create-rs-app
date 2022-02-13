async function getBranch(language: string) {
  try {
    switch (language) {
      case "javascript (ES6+)":
        return "javascript";
      default:
        return "main";
    }
  } catch (error) {
    console.log(error);
  }
}

export { getBranch };
