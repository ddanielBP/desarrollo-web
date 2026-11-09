// vite.config.mjs
import { fileURLToPath, URL } from "node:url";
import { PrimeVueResolver } from "file:///C:/Users/usuario/Desktop/evidencias-web/empleado-qr/node_modules/@primevue/auto-import-resolver/index.mjs";
import tailwindcss from "file:///C:/Users/usuario/Desktop/evidencias-web/empleado-qr/node_modules/@tailwindcss/vite/dist/index.mjs";
import vue from "file:///C:/Users/usuario/Desktop/evidencias-web/empleado-qr/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Components from "file:///C:/Users/usuario/Desktop/evidencias-web/empleado-qr/node_modules/unplugin-vue-components/dist/vite.js";
import { defineConfig } from "file:///C:/Users/usuario/Desktop/evidencias-web/empleado-qr/node_modules/vite/dist/node/index.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/usuario/Desktop/evidencias-web/empleado-qr/vite.config.mjs";
var vite_config_default = defineConfig({
  base: "/desarrollo-web/empleado-qr/",
  // <-- Coloca aquí el nombre exacto de tu repositorio en GitHub
  optimizeDeps: {
    noDiscovery: true
  },
  plugins: [
    vue(),
    tailwindcss(),
    Components({
      resolvers: [PrimeVueResolver()]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcdXN1YXJpb1xcXFxEZXNrdG9wXFxcXGV2aWRlbmNpYXMtd2ViXFxcXGVtcGxlYWRvLXFyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx1c3VhcmlvXFxcXERlc2t0b3BcXFxcZXZpZGVuY2lhcy13ZWJcXFxcZW1wbGVhZG8tcXJcXFxcdml0ZS5jb25maWcubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy91c3VhcmlvL0Rlc2t0b3AvZXZpZGVuY2lhcy13ZWIvZW1wbGVhZG8tcXIvdml0ZS5jb25maWcubWpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnO1xuXG5pbXBvcnQgeyBQcmltZVZ1ZVJlc29sdmVyIH0gZnJvbSAnQHByaW1ldnVlL2F1dG8taW1wb3J0LXJlc29sdmVyJztcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tICdAdGFpbHdpbmRjc3Mvdml0ZSc7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBiYXNlOiAnL2Rlc2Fycm9sbG8td2ViL2VtcGxlYWRvLXFyLycsIC8vIDwtLSBDb2xvY2EgYXF1XHUwMEVEIGVsIG5vbWJyZSBleGFjdG8gZGUgdHUgcmVwb3NpdG9yaW8gZW4gR2l0SHViXG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICAgIG5vRGlzY292ZXJ5OiB0cnVlXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIHZ1ZSgpLFxuICAgICAgICB0YWlsd2luZGNzcygpLFxuICAgICAgICBDb21wb25lbnRzKHtcbiAgICAgICAgICAgIHJlc29sdmVyczogW1ByaW1lVnVlUmVzb2x2ZXIoKV1cbiAgICAgICAgfSlcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgICAgICAgYXBpOiAnbW9kZXJuLWNvbXBpbGVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF5VixTQUFTLGVBQWUsV0FBVztBQUU1WCxTQUFTLHdCQUF3QjtBQUNqQyxPQUFPLGlCQUFpQjtBQUN4QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxvQkFBb0I7QUFONkwsSUFBTSwyQ0FBMkM7QUFTM1EsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsTUFBTTtBQUFBO0FBQUEsRUFDTixjQUFjO0FBQUEsSUFDVixhQUFhO0FBQUEsRUFDakI7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLElBQUk7QUFBQSxJQUNKLFlBQVk7QUFBQSxJQUNaLFdBQVc7QUFBQSxNQUNQLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQztBQUFBLElBQ2xDLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3hEO0FBQUEsRUFDSjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0QscUJBQXFCO0FBQUEsTUFDakIsTUFBTTtBQUFBLFFBQ0YsS0FBSztBQUFBLE1BQ1Q7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
