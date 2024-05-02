import js from "@eslint/js";
import globals from "globals";
import jQueryConfig from "eslint-config-jquery";

/** @type {import('eslint').Linter.Config} */
export default {
	...js.configs.recommended,
	...jQueryConfig,
	languageOptions: {
		globals: {
			...globals.browser,
			...globals.jquery
		}
	}
};
