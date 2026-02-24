module.exports = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        releaseRules: [
          {
            type: 'docs',
            release: 'patch',
          },
          {
            type: 'refactor',
            release: 'patch',
          },
          {
            type: 'style',
            release: 'patch',
          },
          {
            type: 'build',
            release: 'patch',
          },
          {
            type: 'chore',
            release: 'patch',
          },
          {
            type: 'ci',
            release: 'patch',
          },
          {
            type: 'test',
            release: 'patch',
          },
        ],
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
        },
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        writerOpts: {
          mainTemplate: `
## v{{version}} ({{date}})

{{#each commitGroups}}
### {{title}}

{{#each commits}}
#### {{subject}}

{{#if body}}
{{body}}
{{/if}}

{{/each}}
{{/each}}
`,
          commitPartial: `
{{!-- intentionally empty --}}
`,

          transform(commit) {
            if (commit.type !== 'feat' && commit.type !== 'fix') {
              return null
            }

            return {
              subject: commit.subject,
              body: commit.body,
              type:
                commit.type === 'feat'
                  ? '🔥Что нового'
                  : '❌Исправление ошибок',
              hash: null,
              shortHash: null,
            }
          },
        },
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'public/CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['public/CHANGELOG.md'],
      },
    ],
  ],
}
