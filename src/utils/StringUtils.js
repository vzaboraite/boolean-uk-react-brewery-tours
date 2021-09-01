/* Function used to capitalise state name to render at the top of `ListSection` */
/* Resource: https://www.freecodecamp.org/news/how-to-capitalize-words-in-javascript/ */
export function capitalise(sentence) {
  const splittedSentenceInArr = sentence.split(" ");
  const capitalisedWordsArr = splittedSentenceInArr.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  const capitalisedSentence = capitalisedWordsArr.join(" ");

  return capitalisedSentence;
}

export default { capitalise };
