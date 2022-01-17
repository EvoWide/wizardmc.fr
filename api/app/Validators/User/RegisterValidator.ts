/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class RegisterValidator {
  /**
   * Defining a schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ inTable: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    username: schema.string({ escape: true, trim: true }, [
      //rules.unique({ table: 'users', column: 'username' }),
      rules.minLength(3),
      rules.maxLength(16),
    ]),

    password: schema.string({ trim: true }, [rules.minLength(5)]),

    email: schema.string({ escape: true, trim: true }, [
      rules.email({
        sanitize: true,
      }),
      //rules.unique({ table: 'users', column: 'email' }),
    ]),
  })

  /**
   * The `schema` first gets compiled to a reusable function and then that compiled
   * function validates the data at runtime.
   *
   * Since, compiling the schema is an expensive operation, you must always cache it by
   * defining a unique cache key. The simplest way is to use the current request route
   * key, which is a combination of the route pattern and HTTP method.
   */
  public cacheKey = 'user-register'

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   */
  public messages = {
    'username.unique': "Nom d'utilisateur non disponible.",
    'username.minLength': "Nom d'utilisateur trop court.",
    'username.maxLength': "Nom d'utilisateur trop long.",
    'password.minLength': 'Mot de passe pas assez sécurisé.',
    'email.email': 'Email incorrecte.',
    'email.unique': 'Email non disponible.',
  }
}
