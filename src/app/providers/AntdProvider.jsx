import { App, ConfigProvider, theme } from "antd"

const AntdProvider = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#38bdf8",
          borderRadius: 8,
        },
      }}
    >
      <App>
        {children}
      </App>
    </ConfigProvider>
  )
}

export default AntdProvider