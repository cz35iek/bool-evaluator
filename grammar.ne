@preprocessor typescript

# main -> "(" main ")" {% d => d[1] %}
#     | unary_operator main 
#     | main binary_operator main {% d => { 
#         return {
#             left:  d[0][0][0][0],
#             operator: d[1][0][0],
#             right: d[2][0][0][0]
#         } } %}
#     | value


expression -> 
      alternative {% (d) => {console.log(d); return d;} %}

alternative -> 
      conjunction {% (d) => {console.log(d); return d;} %}
    | alternative "OR" conjunction {% (d) => {console.log(d); return d;} %}

conjunction -> 
      negation {% (d) => {console.log(d); return d;} %}
    | conjunction "AND" negation {% (d) => {console.log(d); return d;} %}

negation -> 
      value {% (d) => {console.log(d); return d;} %}
    | "NOT" value {% (d) => {console.log(d); return d;} %}

value -> 
      bool {% (d) => {console.log(d); return d;} %}
    | "(" alternative ")"
    
bool -> 
      "0" {% () => false %}
    | "1" {% () => true %}

_ -> null 
    | " ":+
