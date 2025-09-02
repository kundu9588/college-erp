module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // New features
        "fix", // Bug fixes
        "docs", // Documentation
        "style", // Formatting, missing semicolons, etc
        "refactor", // Code restructuring
        "test", // Adding tests
        "chore", // Maintenance tasks
        "ci", // CI/CD changes
      ],
    ],
  },
};
