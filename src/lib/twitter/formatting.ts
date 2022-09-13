export const formatText = (text: string): string => {
  if (text.startsWith("@")) {
    // remove first handle
    return text.substring(text.indexOf(" ") + 1);
  }

  return text.replace(/https:\/\/[\n\S]+/g, "");
};
