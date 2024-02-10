export const generatePassword = async (req, res) => {
  try {
    const { range, capital, small, number, special } = req.body;
    if (!capital && !small && !number && !special) {
      return res
        .status(200)
        .json({ message: "please choose atleast one option" });
    }
    const capitalLetters = [...Array(26)].map((_, i) =>
      String.fromCharCode(i + 65)
    );
    const smallLetters = [...Array(26)].map((_, i) =>
      String.fromCharCode(i + 97)
    );
    const numbers = [...Array(10)].map((_, i) => String.fromCharCode(i + 48));
    const specialCharectors = "!@#$%^&*()";
    let charset = "";
    let newPassword = "";

    if (capital) charset += capitalLetters.join("");
    if (number) charset += numbers.join("");
    if (small) charset += smallLetters.join("");
    if (special) charset += specialCharectors;
    for (let i = 0; i < range; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return res
      .status(200)
      .json({ password: newPassword, message: "generated" });
  } catch (error) {
    console.log(error.message);
  }
};
