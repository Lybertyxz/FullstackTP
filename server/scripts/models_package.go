package main

import (
	"fmt"
	"go/ast"
	"go/parser"
	"go/token"
	"os"
	"strings"
)

// Extracts the JSON field name from the struct tag, or uses the Go field name if not specified.
func getJsonFieldName(field *ast.Field) string {
	defaultName := ""
	if len(field.Names) > 0 {
		defaultName = field.Names[0].Name
	}

	if field.Tag != nil {
		tagContent := strings.Trim(field.Tag.Value, "`")
		tagPairs := strings.Split(tagContent, " ")
		for _, pair := range tagPairs {
			if strings.HasPrefix(pair, "json:") {
				tagValue := strings.Trim(pair[5:], "\"")
				parts := strings.Split(tagValue, ",")
				if parts[0] != "-" && parts[0] != "" {
					return parts[0]
				}
				break
			}
		}
	}
	return defaultName
}

func goTypeToTsType(goType string, isSlice bool, allStructs map[string]bool) string {
	tsType := "any" // Default type is any
	if _, exists := allStructs[goType]; exists {
		tsType = goType // Use the struct name directly if it's a recognized struct
	} else {
		switch goType {
		case "string":
			tsType = "string"
		case "int", "uint", "int32", "uint32", "int64", "uint64":
			tsType = "number"
		case "bool":
			tsType = "boolean"
		}
	}

	if isSlice {
		tsType += "[]" // Append "[]" for slice types
	}
	return tsType
}

// Generates TypeScript interface for a given struct, including handling JSON tags.
func generateTsInterface(structName string, fields []*ast.Field, allStructs map[string]bool) string {
	tsFields := []string{
		"  id?: number;",
	}

	for _, field := range fields {
		// Skip embedded struct fields by checking if field.Names is empty
		if len(field.Names) == 0 {
			continue
		}

		jsonFieldName := getJsonFieldName(field)
		isSlice := false
		isOptional := false // Indicates if the TypeScript field should be marked as optional
		goType := ""

		switch fieldType := field.Type.(type) {
		case *ast.Ident:
			goType = fieldType.Name
		case *ast.StarExpr:
			// Direct pointers are marked optional
			isOptional = true
			// Detecting *[]Type pattern specifically
			if arrayType, ok := fieldType.X.(*ast.ArrayType); ok {
				isSlice = true
				// Extract element type of slice
				if ident, ok := arrayType.Elt.(*ast.Ident); ok {
					goType = ident.Name
				}
			} else if ident, ok := fieldType.X.(*ast.Ident); ok {
				// For regular pointer fields
				goType = ident.Name
			}
		case *ast.ArrayType:
			isSlice = true
			// Handle non-pointer slice element type
			if ident, ok := fieldType.Elt.(*ast.Ident); ok {
				goType = ident.Name
			}
		}

		tsType := goTypeToTsType(goType, isSlice, allStructs)

		fieldNameSuffix := ""
		if isOptional {
			fieldNameSuffix = "?"
		}

		if jsonFieldName != "" { // Ensure field name is not empty before appending
			tsFields = append(tsFields, fmt.Sprintf("  %s%s: %s;", jsonFieldName, fieldNameSuffix, tsType))
		}
	}

	return fmt.Sprintf("export interface %s {\n%s\n}\n", structName, strings.Join(tsFields, "\n"))
}

func main() {
	fset := token.NewFileSet()
	allStructs := make(map[string]bool)

	// Parse the directory containing the models
	pkgs, err := parser.ParseDir(fset, "./internal/models", nil, parser.ParseComments)
	if err != nil {
		fmt.Println(err)
		return
	}

	// First, collect all struct names to identify relationships
	for _, pkg := range pkgs {
		for _, file := range pkg.Files {
			for _, decl := range file.Decls {
				genDecl, ok := decl.(*ast.GenDecl)
				if !ok || genDecl.Tok != token.TYPE {
					continue
				}
				for _, spec := range genDecl.Specs {
					typeSpec, ok := spec.(*ast.TypeSpec)
					if !ok {
						continue
					}
					_, ok = typeSpec.Type.(*ast.StructType)
					if ok {
						allStructs[typeSpec.Name.Name] = true
					}
				}
			}
		}
	}

	// Generate TypeScript interfaces with consideration for relationships
	var tsInterfaces []string
	for _, pkg := range pkgs {
		for _, file := range pkg.Files {
			for _, decl := range file.Decls {
				genDecl, ok := decl.(*ast.GenDecl)
				if !ok || genDecl.Tok != token.TYPE {
					continue
				}
				for _, spec := range genDecl.Specs {
					typeSpec, ok := spec.(*ast.TypeSpec)
					if !ok {
						continue
					}
					structType, ok := typeSpec.Type.(*ast.StructType)
					if ok {
						tsInterface := generateTsInterface(typeSpec.Name.Name, structType.Fields.List, allStructs)
						tsInterfaces = append(tsInterfaces, tsInterface)
					}
				}
			}
		}
	}

	// Create or open the single TypeScript declaration file
	tsFileName := "models.d.ts"
	tsFile, err := os.Create(tsFileName)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer tsFile.Close()

	// Write all TypeScript interfaces to the file
	for _, tsInterface := range tsInterfaces {
		_, err := tsFile.WriteString(tsInterface + "\n")
		if err != nil {
			fmt.Println(err)
			return
		}
	}

	fmt.Printf("Generated %s with all model interfaces.\n", tsFileName)
}
