"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require();
exports.default = (string) => {
    return {
        model: "text-davinci-003",
        prompt: string,
        temperature: 0,
        max_tokens: 200,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    };
};
