@preprocessor typescript

expression ->
      "0" {% () => false %}
    | "1" {% () => true %}
    | "(" expression ")" {% d => d[1] %}
    | "NOT" expression  {% d => !d[1] %}
    | expression "OR" expression {% d => d[0] || d[2] %}
    | expression "AND" expression {% d => d[0] && d[2] %}