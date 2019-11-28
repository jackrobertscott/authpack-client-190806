import '@fortawesome/fontawesome-free/css/all.min.css'
import GraphiQL from 'graphiql'
import 'graphiql/graphiql.css'
import { createElement as create, FC } from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'emotion'
import { Root, graphql, useTheme } from '../src/index'

console.clear()

const stories = storiesOf('Pages', module).addDecorator(data => {
  return create(Root, {
    theme: 'night_sky',
    children: create('div', {
      children: data(),
      className: css({
        display: 'flex',
        flexGrow: 1,
      }),
    }),
  })
})

stories.add('Explorer', () => {
  return create(Explorer)
})

const Explorer: FC = () => {
  const theme = useTheme()
  return create('div', {
    children: create(GraphiQL, {
      fetcher: async (graphQLParams: any) => {
        try {
          const data = await graphql<any>({
            ...graphQLParams,
            url: 'http://localhost:4000',
            authorization: ['wga-secret-key-f94c72f42177ca30b3f861ead']
              .filter(Boolean)
              .join(','),
          })
          return data.__schema ? { data } : data
        } catch (error) {
          return Promise.resolve(error)
        }
      },
    }),
    className: css({
      flexGrow: 1,
      /**
       * Container.
       */
      '.graphiql-container': {
        fontSize: '1rem',
        '*': {
          fontSize: '1rem !important',
          lineHeight: '1.25rem !important',
          fontFamily: 'Rubik !important',
          fontWeight: '500 !important' as any,
          outline: 'none !important',
          letterSpacing: 'inherit !important',
        },
      },
      /**
       * Topbar.
       */
      '.topBarWrap': {
        // header styles
        margin: 0,
        padding: '20px 25px',
        color: theme.page.title,
        background: theme.page.header,
        borderBottom: theme.page.border,
      },
      '.topBar': {
        margin: 0,
        padding: 0,
        height: 'auto',
        width: 'auto',
        background: 'none',
        border: 'none',
        '.title': {
          margin: '0 auto 0 0',
          padding: 0,
        },
      },
      '.execute-button-wrap': {
        margin: 0,
        padding: 0,
        height: 'auto',
        width: 'auto',
      },
      '.execute-button, .toolbar-button, .docExplorerShow': {
        padding: 15,
        margin: '0 0 0 15px',
        boxShadow: 'none',
        transition: '200ms',
        color: theme.page.label,
        border: theme.page.border,
        background: theme.page.header,
        borderRadius: theme.global.radius,
        '&:hover': {
          color: theme.page.labelHover,
          background: theme.page.headerHover,
        },
      },
      '.execute-button': {
        width: 'auto',
        height: 'auto',
        display: 'flex',
        '&::before': {
          content: '"\f04b"',
          fontFamily: '"Font Awesome 5 Free"',
          fontWeight: 900,
        },
        svg: {
          display: 'none',
        },
      },
      '.execute-options': {
        margin: 0,
        padding: 0,
        top: '75%',
        left: 0,
        borderRadius: 3,
        overflow: 'hidden',
        background: 'transparent',
        border: theme.page.border,
        boxShadow: 'none',
        li: {
          margin: 0,
          padding: 15,
          color: theme.page.label,
          background: theme.page.header,
          borderBottom: theme.page.border,
          transition: '200ms',
          minWidth: 240,
          '&:hover': {
            color: theme.page.labelHover,
            background: theme.page.headerHover,
          },
        },
      },
      '.toolbar': {},
      '.toolbar-button': {
        '&:active': {
          background: 'none',
          boxShadow: 'none',
        },
      },
      '.docExplorerShow': {
        '&::before': {
          content: 'none',
        },
      },
      /**
       * Documents & History.
       */
      '.docExplorerWrap, .historyPaneWrap': {
        width: '50% !important',
        maxWidth: '500px !important',
        boxShadow: 'none',
      },
      '.doc-explorer': {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'hidden',
        color: theme.page.title,
        background: theme.page.background,
        borderLeft: theme.page.border,
      },
      '.historyPaneWrap': {
        color: theme.page.title,
        background: theme.page.background,
        borderRight: theme.page.border,
      },
      '.doc-explorer-back': {
        margin: 0,
        padding: 15,
        height: 'auto',
        display: 'flex',
        flexDirection: 'row-reverse',
        color: theme.page.title,
        '&::before': {
          content: 'none',
        },
        '&::after': {
          content: '"\f100"',
          fontFamily: '"Font Awesome 5 Free"',
          fontWeight: 900,
          marginRight: 15,
          color: theme.page.title,
        },
      },
      '.doc-explorer-title-bar, .history-title-bar': {
        margin: 0,
        padding: 0,
        height: 'auto',
        color: theme.page.title,
        background: theme.page.header,
        borderBottom: theme.page.border,
      },
      '.doc-explorer-title, .history-title': {
        margin: 0,
        padding: 15,
        height: 'auto',
        textAlign: 'left',
      },
      '.docExplorerHide': {
        margin: 0,
        padding: 15,
        height: 'auto',
        color: 'transparent',
        boxSizing: 'content-box',
        width: '1rem',
        '&::before': {
          content: '"\f057"',
          fontFamily: '"Font Awesome 5 Free"',
          fontWeight: 900,
          color: theme.page.title,
        },
      },
      '.doc-explorer-contents, .history-contents': {
        margin: 0,
        padding: 0,
        height: 'auto',
        position: 'unset',
        overflowY: 'auto',
        border: 'none',
      },
      '.doc-alert-text': {
        margin: 0,
        padding: 15,
        display: 'flex',
        color: theme.input.value,
        background: theme.input.background,
        borderBottom: theme.input.border,
      },
      '.search-box': {
        margin: 0,
        padding: 0,
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        transition: '200ms',
        color: theme.input.value,
        background: theme.input.background,
        borderBottom: theme.input.border,
        '&:hover, &:focus-within': {
          color: theme.input.valueHover,
          background: theme.input.backgroundHover,
        },
        '.search-box-icon, .search-box-clear': {
          margin: 0,
          padding: 15,
          height: 'auto',
          position: 'unset',
          transform: 'none',
          background: 'none',
          border: 'none',
          width: '1rem',
          boxSizing: 'content-box',
          borderRadius: 0,
          color: 'transparent',
        },
        '.search-box-icon': {
          paddingRight: 0,
          '&::before': {
            content: '"\f002"',
            fontFamily: '"Font Awesome 5 Free"',
            fontWeight: 900,
            color: theme.input.value,
          },
        },
        '.search-box-clear': {
          '&:hover, &:focus-within': {
            background: theme.input.backgroundHover,
          },
          '&::before': {
            content: '"\f057"',
            fontFamily: '"Font Awesome 5 Free"',
            fontWeight: 900,
            color: theme.input.value,
          },
        },
        input: {
          margin: 0,
          padding: 15,
          height: 'auto',
          background: 'transparent',
          color: theme.input.value,
          '&::placeholder': {
            color: theme.input.placeholder,
          },
          '&:hover, &:focus-within': {
            color: theme.input.valueHover,
          },
        },
      },
      '.error-container': {},
      '.doc-type-description': {
        margin: 0,
        padding: 15,
        color: theme.page.label,
        background: theme.page.background,
        borderBottom: theme.page.border,
        p: {
          margin: 0,
          '&:not(:last-child)': {
            marginBottom: 10,
          },
        },
      },
      '.doc-category': {
        margin: 0,
        padding: 0,
        color: theme.page.label,
        background: theme.page.background,
        '& > span': {
          display: 'flex',
          padding: 15,
        },
      },
      '.doc-category-title': {
        margin: 0,
        padding: '15px 15px 0 15px',
        fontVariant: 'none',
        textTransform: 'capitalize',
        fontWeight: 'inherit',
        color: theme.page.title,
        background: theme.page.background,
        borderBottom: 'none',
      },
      '.doc-category-item': {
        margin: 0,
        padding: 15,
        color: theme.page.label,
        background: theme.page.background,
        borderBottom: theme.page.border,
      },
      '.field-short-description': {
        margin: '15px 0 0',
        padding: 0,
        p: {
          margin: 0,
          '&:not(:last-child)': {
            marginBottom: 10,
          },
        },
      },
      '.history-contents': {
        li: {
          margin: 0,
          padding: 15,
          color: theme.page.label,
          background: theme.page.header,
          borderBottom: theme.page.border,
          transition: '200ms',
          '&:hover': {
            color: theme.page.labelHover,
            background: theme.page.headerHover,
          },
        },
      },
      /**
       * Editor.
       */
      '.editorBar': {},
      '.queryWrap': {},
      '.query-editor': {},
      '.variable-editor': {
        margin: 0,
        padding: 0,
        height: 'auto',
      },
      '.variable-editor-title': {
        margin: 0,
        padding: 15,
        fontVariant: 'none',
        textTransform: 'capitalize',
        fontWeight: 'inherit',
      },
      '.resultWrap': {},
      /**
       * Code Mirror.
       */
      '.CodeMirror': {
        '*': {
          fontFamily: 'Inconsolata !important',
        },
      },
    }),
  })
}
