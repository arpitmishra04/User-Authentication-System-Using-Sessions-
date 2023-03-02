const { google } = require("googleapis");
const fs = require("fs");
//const path = require("path");

const OAuth2Data = require("../credentials3.json");

const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URI = OAuth2Data.web.redirect_uris[0];
const REFRESH_TOKEN =
  "1//04Vy7QpNbzixCCgYIARAAGAQSNwF-L9IrOftbmH03hSNBGBM7llZ_tVi01xYzFwYe4Q5bXKB7T4wggH9ebV4pr1zl_jkNwDsq0ig";

const OAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: OAuth2Client,
});

module.exports = {
  uploadFile: async (title, image) => {
    try {
      const createFile = await drive.files.create({
        requestBody: {
          name: title,
          mimeType: "image/jpeg",
        },
        media: {
          mimeType: "image/jpeg",
          body: fs.createReadStream(image),
        },
      });
      console.log(createFile.data);
    } catch (err) {
      console.error(err);
    }
  },
};
