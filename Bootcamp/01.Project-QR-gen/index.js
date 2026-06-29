import inquirer from "inquirer";
import qrImage from "qr-image";
import fs from "fs";
// inquirer
//   .prompt([
//     {
//       type: "input",
//       name: "url",
//       message: "enter the URL",
//     },
//   ])
//   .then((answers) => {
//     // console.log(`Entered URl is ${answers.url}`);
//     var qr_svg = qrImage.image(`${answers.url}`, { type: "svg" });
//     qr_svg.pipe(fs.createWriteStream("i_love_qr.svg"));
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       console.log("Got some Error", error);
//     } else {
//       console.log("Working fine");
//     }
//   });

async function main() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "url",
      message: "enter the URL",
    },
  ]);

  var qr_svg = qrImage.image(`${answers.url}`, { type: "svg" });
  qr_svg.pipe(fs.createWriteStream("i_love_qr.svg"));
  fs.writeFile("url.txt", answers.url, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  console.log("QR generated for URL -> ", answers.url);
}
main();
