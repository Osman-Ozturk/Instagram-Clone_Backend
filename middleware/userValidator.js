import { body } from 'express-validator';

export const userValidator = [
  body('fullName')
    .notEmpty()
    .withMessage('Vorname muss angegeben werden.')
    .isAlpha('de-DE', { ignore: ' -' })
    .withMessage('Vorname enthält unzulässige Zeichen')
    .trim()
    .escape(),
  body('userName')
    .notEmpty()
    .withMessage('userName muss angegeben werden.')
    .trim(),

  body('email')
    .notEmpty()
    .withMessage('E-Mail muss angegeben werden')
    .trim()
    .isEmail()
    .withMessage('E-Mail-Format ist ungültig')
    .normalizeEmail({"gmail_remove_dots": false }) ,

  body('password')
    .notEmpty()
    .withMessage('Passwort muss angegeben werden.')
    .trim()
    .isStrongPassword()
    .withMessage(
      'Passwort ist nicht sicher. Es soll mindestens acht Zeichen enthalten, davon mindestens eine Kleinbuchstabe, mindestens eine Großbuchstabe, mindestens eine Nummer und mindestens ein Sonderzeichen.'
    )
    .isLength({min:8}),
  body('handyNummer')
    .notEmpty()
    .withMessage('HandyNummer muss angegeben werden.')
    .trim()
    .isLength({min:8}),  
];

